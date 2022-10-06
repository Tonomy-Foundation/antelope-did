import create from './create';
import update from './update';
import deactivate from './deactivate';
import resolve from './resolve';
import {
  Authority,
  CreateOptions,
  AntelopeOptions,
  ChainRegistry,
  DIDUpdateResult,
  DIDCreateResult,
  DIDDeactivateResult,
} from './types';
import {
  defaultCreateOptions,
  defaultAntelopeOptions,
} from './defaultAntelopeOptions';
import { SignatureProvider } from 'eosjs/dist/eosjs-api-interfaces';
import { DIDResolutionResult } from 'did-resolver';

export default class AntelopeDID {
  _options: AntelopeOptions;

  constructor(options: AntelopeOptions) {
    this._options = { ...defaultAntelopeOptions, ...options };
  }

  get options() {
    return this._options;
  }

  set options(options: AntelopeOptions) {
    this._options = options;
  }

  async create(
    creator: string,
    name: string,
    owner: Authority,
    active: Authority,
    options?: CreateOptions
  ): Promise<DIDCreateResult> {
    return await create(creator, name, owner, active, {
      ...defaultCreateOptions,
      ...this._options,
      ...options,
    } as Required<CreateOptions>);
  }

  async resolve(
    did: string,
    options?: AntelopeOptions
  ): Promise<DIDResolutionResult> {
    return await resolve(did, {
      ...this._options,
      ...options,
    } as Required<AntelopeOptions>);
  }

  async update(
    account: string,
    permission: string,
    parent: string,
    auth: Authority,
    options?: AntelopeOptions
  ): Promise<DIDUpdateResult> {
    return await update(account, permission, parent, auth, {
      ...this._options,
      ...options,
    } as Required<AntelopeOptions>);
  }

  async deactivate(did: string, options?: AntelopeOptions): Promise<DIDDeactivateResult> {
    return await deactivate(did, {
      ...this._options,
      ...options,
    } as Required<AntelopeOptions>)
  }
}

export {
  Authority,
  AntelopeOptions,
  CreateOptions,
  ChainRegistry,
  SignatureProvider,
};
