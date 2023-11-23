import IPFS from 'ipfs-core';
import OrbitDB from 'orbit-db';
import * as OrbitDBIdentityProviderEthereum from '@orbitdb/identity-provider-ethereum';
import { addIdentityProvider } from '@orbitdb/core';

export async function initOrbitDB() {
    const ipfs = await IPFS.create();
    addIdentityProvider(OrbitDBIdentityProviderEthereum);
    const orbitdb = await OrbitDB.createInstance(ipfs);
    return { orbitdb, ipfs };
}
