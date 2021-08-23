// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable unicorn/prefer-math-trunc,jsdoc/require-jsdoc */
import { Type } from "../typings/common.typing";
import { BufferedBlockAlgorithmConfig } from "../typings/core/buffered-block-algorithm.typing";
import { BufferedBlockAlgorithm } from "./buffered-block-algorithm";
import { HmacHasher } from "./hmac-hasher";
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
  public static _createHelper(hasher: Type<Hasher>): CreateHelperType {
    return function (
      message: WordArray | string,
      cfg?: BufferedBlockAlgorithmConfig
    ): WordArray {
      const hasherClass: Type<Hasher> = hasher;
      const hasherInstance: Hasher = new hasherClass(cfg);
      return hasherInstance.finalize(message);
    };
  }

  public static _createHmacHelper(hasher: Type<Hasher>) {
    return function (message: WordArray | string, key: string): WordArray {
      const hmacInstance = new HmacHasher(hasher, key);
      return hmacInstance.finalize(message);
    };
  }

  public abstract _doFinalize(): WordArray;
}

export type CreateHelperType = (
  _message: WordArray | string,
  _cfg?: BufferedBlockAlgorithmConfig
) => WordArray;
