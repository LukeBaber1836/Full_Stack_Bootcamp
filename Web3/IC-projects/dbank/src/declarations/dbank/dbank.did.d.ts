import type { Principal } from '@dfinity/principal';
export interface _SERVICE {
  'checkBalance' : () => Promise<number>,
  'compoud' : () => Promise<undefined>,
  'resetAccount' : (arg_0: number) => Promise<undefined>,
  'topUp' : (arg_0: number) => Promise<undefined>,
  'withdrawal' : (arg_0: number) => Promise<undefined>,
}
