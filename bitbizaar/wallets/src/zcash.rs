use std::any::Any;
use rand::{Rng, thread_rng};
use rand_core::OsRng;
use orchard::{
    bundle::Flags,
    tree::{MerkleHashOrchard, Anchor},
    value::NoteValue,
    keys::{SpendingKey, FullViewingKey, Scope, OutgoingViewingKey},
    builder::{Builder as OrchardBuilder, Unauthorized, Unproven, OutputError},
    Address, Note, Bundle, circuit::ProvingKey,
};
use zcash_primitives::{
    merkle_tree::{MerklePath, self},
    transaction::{
        components::amount::{self, Amount},
        TransactionData, TxVersion
    },
    consensus::{BlockHeight, BranchId, MainNetwork},
    sapling::Node,
};
use zcash_proofs::prover::LocalTxProver;

pub fn generate_zcash_wallet() -> (String, String) {
    let mut rng = thread_rng();
    let mut random_bytes = [0u8; 32];
    rng.fill(&mut random_bytes);

    let sk: Option<SpendingKey> = SpendingKey::from_bytes(random_bytes).into();
    let sk = sk.expect("Failed to create spending key from bytes");
    let full_viewing_key = FullViewingKey::from(&sk);
    let address = full_viewing_key.address_at(0u32, Scope::External);

    (format!("{:?}", sk), format!("{:?}", address))
}

pub fn sign_transaction(
    sk: SpendingKey, 
    recipient: Address, 
    value: u64,
    memo: Option<Vec<u8>>,
) -> Result<TransactionData<Unauthorized>, String> {
    let fvk = FullViewingKey::from(&sk);
    let ovk = fvk.to_ovk(Scope::External);

    let note_value = NoteValue::from_raw(value).ok_or("Invalid note value")?;
    let flags = Flags::from_parts(true, true); // Enable both spends and outputs

    let mut builder = OrchardBuilder::new(flags, None); // No anchor for new transactions

    // Add recipient to the transaction
    builder.add_recipient(Some(ovk), recipient, note_value, memo)
        .map_err(|e| e.to_string())?;

    // Build the Orchard bundle
    let bundle: Bundle<InProgress<Unproven, Unauthorized>> = builder.build(OsRng)
        .map_err(|e| e.to_string())?;

    // Create a proof for the bundle
    let pk = ProvingKey::build();
    let sighash = [0u8; 32]; // This should be the actual sighash of the transaction
    let proved_bundle = bundle.create_proof(&pk, OsRng)
        .map_err(|e| e.to_string())?;

    // Apply signatures to the bundle
    let authorized_bundle = proved_bundle
        .apply_signatures(OsRng, sighash, &[sk])
        .map_err(|e| e.to_string())?;

    // Create the transaction data
    let consensus_branch_id = BranchId::for_height(&MainNetwork, BlockHeight::from_u32(0));
    let version = TxVersion::suggested_for_branch(consensus_branch_id);
    let transaction_data = TransactionData::from_parts(
        version,
        consensus_branch_id,
        0, // Lock time
        BlockHeight::from_u32(0), // Expiry height
        None, // Transparent inputs and outputs
        None, // Sapling data
        None, // JoinSplit data
        Some(authorized_bundle), // Orchard bundle
    );

    Ok(transaction_data)
}
