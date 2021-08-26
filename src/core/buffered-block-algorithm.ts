import { Utf8 } from "@/enc/utf8";
import { BufferedBlockAlgorithmConfig } from "@/typings/core/buffered-block-algorithm.typing";

import { WordArray } from "./word-array";

/**
 * BufferedBlock算法模板 抽象类
 *
 * @author rikka
 * @exports
 * @abstract
 * @class BufferedBlockAlgorithm
 */
export abstract class BufferedBlockAlgorithm {
  public cfg: BufferedBlockAlgorithmConfig;
  public _data: WordArray;

  public _nDataBytes: number;
  public _minBufferSize: number = 0;

  constructor(cfg?: BufferedBlockAlgorithmConfig) {
    this._data = new WordArray();
    this._nDataBytes = 0;
    this.cfg = cfg
      ? cfg
      : {
          blockSize: 1
        };
  }
  reset(): void {
    this._data = new WordArray();
    this._nDataBytes = 0;
  }
  clone(): BufferedBlockAlgorithm {
    const clone = this.constructor();
    for (const attr in this) {
      // eslint-disable-next-line no-prototype-builtins
      if (this.hasOwnProperty(attr)) {
        clone[attr] = this[attr];
      }
    }
    clone._data = this._data.clone();
    return clone;
  }
  abstract _doProcessBlock(_wordArray: number[], _offset: number): void;

  _append(data: string | WordArray): void {
    if (typeof data === "string") {
      data = Utf8.parse(data);
    }
    // eslint-disable-next-line unicorn/prefer-spread
    this._data.concat(data);
    this._nDataBytes += data.sigBytes;
  }

  _process(doFlush?: boolean): WordArray {
    if (!this.cfg.blockSize) {
      throw new Error("missing blockSize in config");
    }
    let processedWords: number[] = [];

    const data = this._data;
    const dataWords = data.words;
    const dataSigBytes = data.sigBytes;
    const blockSize = this.cfg.blockSize;
    const blockSizeBytes = blockSize * 4;

    let nBlockReady = dataSigBytes / blockSizeBytes;
    nBlockReady = doFlush
      ? Math.ceil(nBlockReady)
      : // eslint-disable-next-line unicorn/prefer-math-trunc
        Math.max((nBlockReady | 0) - this._minBufferSize, 0);
    const nWordsReady = nBlockReady * blockSize;
    const nBytesReady = Math.min(nWordsReady * 4, dataSigBytes);
    if (nWordsReady) {
      for (let offset = 0; offset < nWordsReady; offset += blockSize) {
        this._doProcessBlock(dataWords, offset);
      }

      processedWords = dataWords.splice(0, nWordsReady);
      data.sigBytes -= nBytesReady;
    }
    return new WordArray(processedWords, nBytesReady);
  }
}
