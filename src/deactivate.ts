import { DIDDeactivateResult, AntelopeOptions } from './types';

export default async function deactivate(
  did: string,
  options?: AntelopeOptions
): Promise<DIDDeactivateResult> {
  throw Error('Antelope DID deactivate not supported. If this Antelope chain support deactivation of accounts, please override this function with the appropriate functionality');
}
