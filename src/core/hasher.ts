// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable unicorn/prefer-math-trunc,jsdoc/require-jsdoc */
import { BufferedBlockAlgorithmConfig } from "../typings/core/buffered-block-algorithm.typing";
import { BufferedBlockAlgorithm } from "./buffered-block-algorithm";
import { WordArray } from "./word-array";

export abstract class Hasher extends BufferedBlockAlgorithm {
  public constructor(cfg?: BufferedBlockAlgorithmConfig) {
    super(cfg ? cfg : { blockSize: 512 / 32 });
    this.reset();
  }
  reset(): void {
    this._data = new WordArray();
    this._nDataBytes = 0;
  }
  update(messageUpdate: string | WordArray): Hasher {
    this._append(messageUpdate);
    this._process();
    return this;
  }
  finalize(messageUpdate?: string | WordArray): WordArray {
    if (messageUpdate) {
      this._append(messageUpdate);
    }
    const hash = this._doFinalize();
    return hash;
  }
  public static _createHelper(hasher: typeof Hasher): CreateHelperType {
    function helper(
      message: WordArray | string,
      cfg?: BufferedBlockAlgorithmConfig
    ): WordArray {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const haserClass: any = hasher;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const hasherInstance: any = new haserClass(cfg);
      return hasherInstance.finalize(message);
    }
    return helper;
  }

  public abstract _doFinalize(): WordArray;
}

export type CreateHelperType = (
  _message: WordArray | string,
  _cfg?: BufferedBlockAlgorithmConfig
) => WordArray;
