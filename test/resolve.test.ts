import AntelopeDID from '../src/index';
import fetch from 'node-fetch';

const jungleTestKeys = require('../jungleTestKeys.json');

describe('Antelope DID Resolve', () => {
  it('Resolve a Jungle DID', async () => {
    expect.assertions(1);
    const antelopeDid = new AntelopeDID({ fetch });

    const did = `did:antelope:eos:testnet:jungle:${jungleTestKeys.name}`;
    const didDoc = await antelopeDid.resolve(did);
    if (didDoc.didResolutionMetadata.error) {
      console.error(didDoc.didResolutionMetadata.error);
    }

    expect(didDoc.didDocument).toBeDefined();
  });
});