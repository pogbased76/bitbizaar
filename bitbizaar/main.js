// Import necessary libraries
import IPFS from 'ipfs-core';
import { create } from '@orbitdb/core';
import * as OrbitDBIdentityProviderEthereum from '@orbitdb/identity-provider-ethereum';
import { Identities, addIdentityProvider } from '@orbitdb/core';

async function init() {
    // Initialize IPFS
    const ipfs = await IPFS.create();

    // Add Ethereum Identity Provider to OrbitDB
    addIdentityProvider(OrbitDBIdentityProviderEthereum);

    // Create identities using the IPFS instance
    const identities = await Identities({ ipfs });

    // Check for Ethereum provider (e.g., MetaMask)
    if (typeof window.ethereum !== 'undefined') {
        // Get user's Ethereum account and signature
        const { account, signature } = await getSignature();

        // Create an Ethereum identity with a dynamic user ID
        const identity = await identities.createIdentity({ id: account, type: 'ethereum' });

        // Display user information
        displayUserInfo(account, signature);
    } else {
        // Handle the absence of an Ethereum provider
        document.querySelector('#app').innerHTML = '<p>Ethereum wallet not detected. Please install MetaMask.</p>';
    }
}

async function getSignature() {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];
    const signature = await window.ethereum.request({
        method: 'personal_sign',
        params: [account, 'Please sign this message to confirm your identity.'],
    });
    return { account, signature };
}

function displayUserInfo(account, signature) {
    document.querySelector('#userInfo').innerHTML = `
        <p>Address: ${account}</p>
        <p>Signature: ${signature}</p>`;
}

// Initialize everything on window load
window.addEventListener('load', init);
