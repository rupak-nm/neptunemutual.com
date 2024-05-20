import { AbstractConnector } from '@web3-react/abstract-connector';
import { ConnectorNames } from '../../enum.js';
export declare class MetamaskConnector extends AbstractConnector {
    readonly NAME = "Metamask Wallet";
    readonly CONNECTOR_NAME = ConnectorNames.MetaMask;
    constructor(kwargs: any);
    handleChainChanged(chainId: string): void;
    handleAccountsChanged(accounts: string[]): void;
    handleClose(code: number, reason: string): void;
    handleNetworkChanged(chainId: string): void;
    handleConnect(connectInfo: {
        chainId: string;
    }): void;
    activate(): Promise<{
        provider: any;
    } & ({
        account: any;
    } | {
        account?: undefined;
    })>;
    getProvider(): Promise<any>;
    getChainId(): Promise<number | string>;
    getAccount(): Promise<null | string>;
    deactivate(): void;
    isAuthorized(): Promise<any>;
    setupNetwork(networkId: number): Promise<boolean>;
    handleError(error: any): never;
}
