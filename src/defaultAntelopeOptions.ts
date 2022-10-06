import { CreateOptions, AntelopeOptions } from './types';

export const defaultAntelopeOptions: Partial<AntelopeOptions> = {
  accountPermission: 'active',
  transactionOptions: {
    blocksBehind: 3,
    expireSeconds: 30,
  },
};

export const defaultCreateOptions: Partial<CreateOptions> = {
  buyrambytes: 8192,
  stakeNetQuantity: '1.0000 EOS',
  stakeCpuQuantity: '1.0000 EOS',
  transfer: false,
};