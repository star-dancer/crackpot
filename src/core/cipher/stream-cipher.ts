import { BufferedBlockAlgorithmConfig } from "@/typings/core/buffered-block-algorithm.typing";

import { WordArray } from "../word-array";
import { Cipher } from "./cipher";

export abstract class StreamCipher extends Cipher {
  constructor(
    xformMode: number,
    key: WordArray,
    cfg?: BufferedBlockAlgorithmConfig
  ) {
    super(xformMode, key, Object.assign({ blockSize: 1 }, cfg));
  }

  public _doFinalize(): WordArray {
    const finalProcessedBlocks = this._process(!!"flush");
    return finalProcessedBlocks;
  }
}
