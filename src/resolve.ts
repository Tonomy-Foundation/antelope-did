import { DIDResolutionResult, Resolver } from '@tonomy/did-resolver';
import { getResolver } from '@tonomy/antelope-did-resolver';
import { AntelopeOptions } from './types';

const resolver = new Resolver(getResolver() as any);

export default async function resolve(
  did: string,
  options?: AntelopeOptions
): Promise<DIDResolutionResult> {
  return await resolver.resolve(did, { ...options });
}
