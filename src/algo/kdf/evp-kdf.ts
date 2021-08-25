import { WordArray } from "@/core/word-array";
import { EvpKDFConfig } from "@/typings/kdf/evp-kdf.typing";

import { MD5Algo } from "../hash/md5.algo";

export class EvpKDF {
  public cfg: EvpKDFConfig;

  constructor(cfg?: Partial<EvpKDFConfig>) {
    this.cfg = Object.assign(
      {
        keySize: 128 / 32,
        hasher: MD5Algo,
        iterations: 1
      },
      cfg
    );
  }

  compute(password: WordArray | string, salt: WordArray | string): WordArray {
    const hasher = new this.cfg.hasher();
    const derivedKey = new WordArray();

    let block;
    while (derivedKey.words.length < this.cfg.keySize) {
      if (block) {
        hasher.update(block);
      }
      block = hasher.update(password).finalize(salt);
      hasher.reset();
      for (let i = 0; i < this.cfg.iterations; i++) {
        block = hasher.finalize(block);
        hasher.reset();
      }
      // eslint-disable-next-line unicorn/prefer-spread
      derivedKey.concat(block);
    }
    derivedKey.sigBytes = this.cfg.keySize * 4;
    return derivedKey;
  }
}
