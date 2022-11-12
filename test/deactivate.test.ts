import AntelopeDID from '../src';
import { JsSignatureProvider } from 'eosjs/dist/eosjs-jssig';
import jungleTestKeys from '../jungleTestKeys.json';
import fetch from 'node-fetch';

describe('Antelope DID Deactivate', () => {
  it('Try deactivate a DID', async () => {
    expect.assertions(1);
    const signatureProvider = new JsSignatureProvider([jungleTestKeys.private]);
    const antelopeDID = new AntelopeDID({
      signatureProvider,
      chain: 'eos:testnet:jungle',
      fetch,
    });

    const did = `did:eosio:eos:testnet:jungle:${jungleTestKeys.name}`;
    try {
      await antelopeDID.deactivate(did);
    } catch (e) {
      expect(e).toBeDefined();
    }
  });

});
