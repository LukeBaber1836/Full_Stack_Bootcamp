import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface _SERVICE {
  'checkBalance' : ActorMethod<[], number>,
  'compoud' : ActorMethod<[], undefined>,
  'resetAccount' : ActorMethod<[number], undefined>,
  'topUp' : ActorMethod<[number], undefined>,
  'withdrawal' : ActorMethod<[number], undefined>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
