import { DIDDocument } from '@tonomy/did-resolver';
import { RpcError } from 'eosjs';
import { SignatureProvider, TransactResult } from 'eosjs/dist/eosjs-api-interfaces';

export interface ChainData {
  chainId: string;
  service: {
    id: string;
    type: string | [string];
    serviceEndpoint: string;
  }[];
}

export interface ChainRegistry {
  [x: string]: ChainData;
}

export interface AntelopeOptions extends FetchOptions {
  chain?: string;
  fetch?: any;
  signatureProvider?: SignatureProvider;
  accountPermission?: string;
  registry?: ChainRegistry;
  transactionOptions?: {
    blocksBehind?: number;
    expireSeconds?: number;
  };
}

export interface CreateOptions extends Partial<AntelopeOptions> {
  buyrambytes?: number;
  stakeNetQuantity?: string;
  stakeCpuQuantity?: string;
  transfer?: boolean;
}

export interface Authority {
  threshold: number;
  keys?: [
    {
      key: string;
      weight: number;
    }
  ];
  accounts: [] | [
    {
      permission: {
        actor: string;
        permission: string;
      };
      weight: number;
    }
  ];
  waits: [] | [
    {
      wait_sec: number;
      wait: number;
    }
  ];
}

export interface DIDCreateResult {
  didCreateMetadata: {
    tx?: TransactResult,
    error?: 'invalidDid' | 'notFound' | 'representationNotSupported' | 'unsupportedDidMethod' | string | RpcError,
  },
  didDocument?: DIDDocument
}

export interface DIDUpdateResult {
  didUpdateMetadata: {
    tx?: TransactResult,
    error?: 'invalidDid' | 'notFound' | 'representationNotSupported' | 'unsupportedDidMethod' | string | RpcError,
  },
  didDocument?: DIDDocument
}

export interface DIDDeactivateResult {
  didDeactivateMetadata: {
    tx?: TransactResult,
    error?: 'invalidDid' | 'notFound' | 'representationNotSupported' | 'unsupportedDidMethod' | string | RpcError,
  }
}