import React, { type ReactNode } from 'react';
import { type Config, type ConnectorNames } from './enum.js';
import { type JsonRpcSigner } from '@ethersproject/providers';
export declare function useConnectWallet(): {
    isActive: boolean;
    logout: () => void;
    openPopup: () => void;
    login: (connectorName: ConnectorNames) => Promise<void>;
    switchNetwork: (networkId: number | null | undefined) => Promise<void>;
    signerOrProvider?: JsonRpcSigner | undefined;
    connectedChainId?: number | undefined;
    selectedChainId: number | null | undefined;
    /**
     * This function is used to set the selected chain id.
     * If the value is `undefined`, the user will be prompted to select a network.
     * If the value is `null`, the user will be able to connect to any network.
     */
    setSelectedChainId: React.Dispatch<React.SetStateAction<number | undefined>>;
    account: string | null | undefined;
};
export declare function useConnectWalletPopup(): {
    wallets: (Config & {
        id: number;
    })[];
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    isConnecting: boolean;
};
interface ProviderProps {
    children?: ReactNode;
    connectors: any[];
    supportedNetworks: number[];
    /**
     *
     * @returns The initial network id to connect to.
     * If the return value is `undefined`, the user will be prompted to select a network.
     * If the return value is `null`, the user will be able to connect to any network.
     */
    getInitialNetwork: () => Promise<number | null | undefined>;
}
export declare const ConnectWallet: {
    Root: ({ children, connectors, getInitialNetwork, supportedNetworks }: ProviderProps) => React.JSX.Element;
};
export {};
