import {
  REGEX_ACCOUNT_NAME,
  REGEX_CHAIN_ID,
  REGEX_CHAIN_NAME,
} from '@tonomy/antelope-did-resolver';
import { ChainData, ChainRegistry } from './types';

export function getChainData(
  chainRegistry: ChainRegistry,
  chainId: string
): ChainData {
  // findChainByName
  const partsName = chainId.match(REGEX_CHAIN_NAME);
  if (partsName) {
    const entry = chainRegistry[partsName[1]];
    if (entry) return entry;
    throw new Error(
      'No matching chain registry entry for supplied chain name.'
    );
  }

  // findChainById
  const partsID = chainId.match(REGEX_CHAIN_ID);
  if (partsID) {
    for (let key of Object.keys(chainRegistry)) {
      const entry = chainRegistry[key];
      if (entry.chainId === partsID[1]) return entry;
      throw new Error(
        'No matching chain registry entry for supplied chain id.'
      );
    }
  }

  throw new Error(
    'Supplied chain id or name does not conform to specification.'
  );
}

export function validateAccountName(name: string): void {
  if (name.match(REGEX_ACCOUNT_NAME) === null)
    throw new Error(name + ' does not conform to account name specification.');
}
