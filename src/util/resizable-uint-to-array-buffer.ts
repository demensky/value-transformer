import {isValidResizableUint} from './is-valid-resizable-uint';

export function resizableUintToArrayBuffer(length: number): ArrayBuffer {
  console.assert(isValidResizableUint(length));

  throw new Error('Not implemented');
}
