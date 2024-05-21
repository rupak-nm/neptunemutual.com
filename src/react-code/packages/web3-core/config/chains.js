// TODO: Improve this file, make it easy to add more networks
// TODO: Merge chains.ts and rpcUrls.ts
import BaseGoerliLogo from '../logos/chains/BaseGoerliLogo.jsx';
import ArbitrumLogo from '../logos/chains/ArbitrumLogo.jsx';
import AvaxLogo from '../logos/chains/AvaxLogo.jsx';
import BSCLogo from '../logos/chains/BSCLogo.jsx';
import EthLogo from '../logos/chains/EthLogo.jsx';
import PolygonLogo from '../logos/chains/PolygonLogo.jsx';
import { rpcUrls } from './rpcUrls.js';
import { convertNetworkIdToChainId } from '../utils/web3.js';
/**
 *
 * interface AddEthereumChainParameter {
 *   chainId: string; // A 0x-prefixed hexadecimal string
 *   chainName: string;
 *   nativeCurrency: {
 *     name: string;
 *     symbol: string; // 2-6 characters long
 *     decimals: 18;
 *   };
 *   rpcUrls: string[];
 *   blockExplorerUrls?: string[];
 *   iconUrls?: string[]; // Currently ignored.
 * }
 *
 */
// Update according to https://github.com/ethereum-lists/chains
// Should strictly follow interface AddEthereumChainParameter (no additional keys can be added)
export const chains = [
    {
        chainId: convertNetworkIdToChainId(56),
        chainName: 'Binance Smart Chain',
        nativeCurrency: {
            name: 'Binance Coin',
            symbol: 'BNB',
            decimals: 18
        },
        rpcUrls: rpcUrls[56],
        blockExplorerUrls: ['https://bscscan.com']
    },
    {
        chainId: convertNetworkIdToChainId(97),
        chainName: 'BSC Testnet',
        nativeCurrency: {
            name: 'Binance Coin',
            symbol: 'tBNB',
            decimals: 18
        },
        rpcUrls: rpcUrls[97],
        blockExplorerUrls: ['https://testnet.bscscan.com']
    },
    {
        chainId: convertNetworkIdToChainId(137),
        chainName: 'Polygon',
        nativeCurrency: {
            name: 'MATIC',
            symbol: 'MATIC',
            decimals: 18
        },
        rpcUrls: rpcUrls[137],
        blockExplorerUrls: ['https://polygonscan.com/']
    },
    {
        chainId: convertNetworkIdToChainId(80001),
        chainName: 'Mumbai',
        nativeCurrency: {
            name: 'MATIC',
            symbol: 'MATIC',
            decimals: 18
        },
        rpcUrls: rpcUrls[80001],
        blockExplorerUrls: ['https://mumbai.polygonscan.com/']
    },
    {
        chainId: convertNetworkIdToChainId(43113),
        chainName: 'Fuji',
        nativeCurrency: {
            name: 'AVAX',
            symbol: 'AVAX',
            decimals: 18
        },
        rpcUrls: rpcUrls[43113],
        blockExplorerUrls: ['https://testnet.snowtrace.io/']
    },
    {
        chainId: convertNetworkIdToChainId(84531),
        chainName: 'Base Goerli',
        nativeCurrency: {
            name: 'ETH',
            symbol: 'ETH',
            decimals: 18
        },
        rpcUrls: rpcUrls[84531],
        blockExplorerUrls: ['https://goerli.basescan.org/']
    },
    {
        chainId: convertNetworkIdToChainId(195),
        chainName: 'X1 testnet',
        nativeCurrency: {
            name: 'OKB',
            symbol: 'OKB',
            decimals: 18
        },
        rpcUrls: rpcUrls[195],
        blockExplorerUrls: ['https://www.okx.com/explorer/x1-test']
    },
    {
        chainId: convertNetworkIdToChainId(42161),
        chainName: 'Arbitrum One',
        nativeCurrency: {
            name: 'ETH',
            symbol: 'ETH',
            decimals: 18
        },
        rpcUrls: rpcUrls[42161],
        blockExplorerUrls: ['https://arbiscan.io/']
    },
    {
        chainId: convertNetworkIdToChainId(1),
        chainName: 'Ethereum',
        nativeCurrency: {
            name: 'Ether',
            symbol: 'ETH',
            decimals: 18
        },
        rpcUrls: rpcUrls[1],
        blockExplorerUrls: ['https://etherscan.io']
    }
];
export const NetworkNames = {
    56: 'Binance Smart Chain',
    97: 'BSC Testnet',
    137: 'Polygon',
    80001: 'Mumbai',
    43113: 'Fuji (Avalanche C-Chain)',
    84531: 'Base Goerli',
    42161: 'Arbitrum One',
    1: 'Ethereum Mainnet',
    195: 'X1 testnet'
};
export const ChainLogos = {
    56: BSCLogo,
    97: BSCLogo,
    80001: PolygonLogo,
    137: PolygonLogo,
    43113: AvaxLogo,
    84531: BaseGoerliLogo,
    42161: ArbitrumLogo,
    1: EthLogo,
    4: EthLogo,
    5: EthLogo,
    6: EthLogo,
    195: EthLogo
};
export const ChainBgColor = {
    56: '#F3BA2F',
    97: '#F3BA2F',
    80001: '#8247E5',
    137: '#8247E5',
    43113: '#E84142',
    84531: '#0052FF',
    42161: '#5A72E8',
    1: '#5A72E8',
    4: '#5A72E8',
    5: '#5A72E8',
    195: '#000000',
    6: '#5A72E8'
};
export const explorer = {
    address: {
        56: 'https://bscscan.com/address/%s',
        97: 'https://testnet.bscscan.com/address/%s',
        1: 'https://etherscan.io/address/%s',
        80001: 'https://mumbai.polygonscan.com/address/%s',
        42161: 'https://arbiscan.io/address/%s',
        43113: 'https://testnet.snowtrace.io/address/%s',
        84531: 'https://goerli.basescan.org/address/%s',
        195: 'https://www.okx.com/explorer/x1-test/address/%s',
        137: 'https://polygonscan.com/address/%s'
    },
    tx: {
        56: 'https://bscscan.com/tx/%s',
        97: 'https://testnet.bscscan.com/tx/%s',
        1: 'https://etherscan.io/tx/%s',
        80001: 'https://mumbai.polygonscan.com/tx/%s',
        42161: 'https://arbiscan.io/tx/%s',
        43113: 'https://testnet.snowtrace.io/tx/%s',
        84531: 'https://goerli.basescan.org/tx/%s',
        195: 'https://www.okx.com/explorer/x1-test/tx/%s',
        137: 'https://polygonscan.com/tx/%s'
    },
    block: {
        56: 'https://bscscan.com/block/%s',
        97: 'https://testnet.bscscan.com/block/%s',
        1: 'https://etherscan.io/block/%s',
        80001: 'https://mumbai.polygonscan.com/block/%s',
        42161: 'https://arbiscan.io/block/%s',
        43113: 'https://testnet.snowtrace.io/block/%s',
        84531: 'https://goerli.basescan.org/block/%s',
        195: 'https://www.okx.com/explorer/x1-test/block/%s',
        137: 'https://polygonscan.com/block/%s'
    },
    token: {
        56: 'https://bscscan.com/token/%s',
        97: 'https://testnet.bscscan.com/token/%s',
        1: 'https://etherscan.io/token/%s',
        80001: 'https://mumbai.polygonscan.com/token/%s',
        42161: 'https://arbiscan.io/token/%s',
        43113: 'https://testnet.snowtrace.io/token/%s',
        84531: 'https://goerli.basescan.org/token/%s',
        195: 'https://www.okx.com/explorer/x1-test/token/%s',
        137: 'https://polygonscan.com/token/%s'
    }
};
