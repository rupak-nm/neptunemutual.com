import { type ConnectorNames } from '../enum.js';
export declare function useActivator({ onDeactivate, onActivate }?: {
    onDeactivate?: () => void;
    onActivate?: (connectorName: ConnectorNames, networkId: number | null) => void;
}): (networkId: number | null, connectorName: ConnectorNames) => Promise<void>;
