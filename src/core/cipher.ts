import { CipherConfig } from "@/typings/core/cipher.typing";

import { BufferedBlockAlgorithm } from "./buffered-block-algorithm";
import { WordArray } from "./word-array";

export class Cipher extends BufferedBlockAlgorithm {
  public cfg: CipherConfig;
  constructor(xformMode: number, key: WordArray, cfg: CipherConfig) {
    super();
    this.cfg = cfg;
  }
  _doProcessBlock(_wordArray: number[], _offset: number): void {
    throw new Error("Method not implemented.");
  }
}
