import { type ConnectorNames } from '../enum.js';
export declare function useActivator(): (networkId: number, connectorName: ConnectorNames) => Promise<void>;
