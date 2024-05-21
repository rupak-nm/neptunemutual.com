import { chains } from '../../config/chains.js';
import { convertNetworkIdToChainId } from '../../utils/web3.js';
/**
 * @param {number} networkId
 */
function getNetworkParams(networkId) {
    return chains.find((x) => x.chainId === convertNetworkIdToChainId(networkId));
}
/**
 * @param {number} networkId
 */
async function addChain(provider, networkId) {
    try {
        await provider.request({
            method: 'wallet_addEthereumChain',
            params: [getNetworkParams(networkId)]
        });
        return true;
    }
    catch (addError) {
        // handle "add" error
        console.error(addError);
    }
    return false;
}
/**
 * @param {number} networkId
 */
export async function commonSetupNetwork(provider, networkId) {
    const chainParams = getNetworkParams(networkId);
    if (!chainParams) {
        console.error(`No configuration found for network: ${networkId}`);
    }
    try {
        await provider.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: convertNetworkIdToChainId(networkId) }]
        });
        return true;
    }
    catch (switchError) {
        // This error code indicates that the chain has not been added to MetaMask.
        if (switchError.code === 4902) {
            return await addChain(provider, networkId);
        }
        // handle other "switch" errors
        console.error(switchError);
    }
    return false;
}
