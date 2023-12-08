import IPFS from 'ipfs-core';
import { create } from '@orbitdb/core';
import * as OrbitDBIdentityProviderEthereum from '@orbitdb/identity-provider-ethereum';
import { Identities, addIdentityProvider } from '@orbitdb/core';

// Initialize IPFS and add Ethereum Identity Provider to OrbitDB
async function initOrbitDB() {
    const ipfs = await IPFS.create();
    addIdentityProvider(OrbitDBIdentityProviderEthereum);
    const identities = await Identities({ ipfs });
    return identities;
}

// Get user's Ethereum account and signature
async function getSignature() {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];
    const signature = await window.ethereum.request({
        method: 'personal_sign',
        params: [account, 'Please sign this message to confirm your identity.'],
    });
    return { account, signature };
}

// Exposed function to authenticate the user
export async function authenticateUser() {
    if (typeof window.ethereum !== 'undefined') {
        const identities = await initOrbitDB();
        const { account, signature } = await getSignature();

        const identity = await identities.createIdentity({ id: account, type: 'ethereum' });

        // Return account and signature for Rust to use
        return [account, signature];
    } else {
        document.querySelector('#root').innerHTML = '<p>Ethereum wallet not detected. Please install MetaMask.</p>';
        return [];
    }
}

// Initialize everything on window load
window.addEventListener('load', async () => {
    // Additional initialization logic if necessary
});
//Change this page to be the Rest API endpoint.