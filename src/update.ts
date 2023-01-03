import { getResolver, antelopeChainRegistry } from '@tonomy/antelope-did-resolver';
import { Api, JsonRpc, RpcError } from 'eosjs';
import { Authority, DIDUpdateResult, AntelopeOptions } from './types';
import { getChainData, validateAccountName } from './util';
import { TextDecoder, TextEncoder } from 'util';
import { Resolver } from '@tonomy/did-resolver';

const resolver = new Resolver(getResolver() as any);

export default async function update(
  account: string,
  permission: string,
  parent: string,
  auth: Authority,
  options: Required<AntelopeOptions>
): Promise<DIDUpdateResult> {
  validateAccountName(account);

  const chainRegistry = {
    ...antelopeChainRegistry,
    ...options.registry,
  };
  const chainData = getChainData(chainRegistry, options.chain);

  for (const service of chainData.service) {
    const rpc = new JsonRpc(service.serviceEndpoint, options.fetch ? { fetch: options.fetch } : undefined);
    const api = new Api({
      rpc,
      signatureProvider: options.signatureProvider,
      textDecoder: new TextDecoder() as any,
      textEncoder: new TextEncoder(),
    });
    try {
      const txData = {
        actions: [
          {
            account: 'eosio',
            name: 'updateauth',
            authorization: [
              {
                actor: account,
                permission: parent,
              },
            ],
            data: {
              account,
              permission,
              parent,
              auth
            },
          },
        ],
      }
      const result: any = await api.transact(
        txData,
        options.transactionOptions
      );

      // fetch DIDDocument
      const did = `did:antelope:${options.chain}:${account}`;
      const didResult = await resolver.resolve(did, { ...options });
      const { error } = didResult.didResolutionMetadata;
      if (error) {
        return {
          didUpdateMetadata: {
            tx: result,
            error: error
          }
        };
      }
      if (!didResult.didDocument) {
        return {
          didUpdateMetadata: {
            error: 'notFound'
          }
        };
      }

      return {
        didUpdateMetadata: {
          tx: result
        },
        didDocument: didResult.didDocument
      }
    } catch (err) {
      if (err instanceof RpcError) {
        return {
          didUpdateMetadata: {
            error: err
          }
        }
      }
      console.error(err);
    }
  }

  throw new Error('Could not update DID.');
}
