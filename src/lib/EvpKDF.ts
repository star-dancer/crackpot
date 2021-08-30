import { Hasher } from "./Hasher";
import { MD5 } from "./MD5";
import { WordArray } from "./WordArray";

export interface OptionalEvpKDFConfig {
  keySize?: number;
  hasher?: typeof Hasher;
  iterations?: number;
}

export interface EvpKDFConfig extends OptionalEvpKDFConfig {
  keySize: number;
  hasher: typeof Hasher;
  iterations: number;
}

export class EvpKDF {
  public cfg: EvpKDFConfig;

  /**
   * Initializes a newly created key derivation function.
   *
   * @param cfg (Optional) The configuration options to use for the derivation.
   * @example
   *
   *     let kdf = EvpKDF.create();
   *     let kdf = EvpKDF.create({ keySize: 8 });
   *     let kdf = EvpKDF.create({ keySize: 8, iterations: 1000 });
   */
  constructor(cfg?: OptionalEvpKDFConfig) {
    this.cfg = Object.assign(
      {
        keySize: 128 / 32,
        hasher: MD5,
        iterations: 1
      },
      cfg
    );
  }

  /**
   * Derives a key from a password.
   *
   * @param password The password.
   * @param salt A salt.
   * @returns The derived key.
   * @example
   *
   *     let key = kdf.compute(password, salt);
   */
  compute(password: WordArray | string, salt: WordArray | string): WordArray {
    // Init hasher
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const hasher = new (<any>this.cfg.hasher)();

    // Initial values
    const derivedKey = new WordArray();

    // Generate key
    let block;
    while (derivedKey.words.length < this.cfg.keySize) {
      if (block) {
        hasher.update(block);
      }
      block = hasher.update(password).finalize(salt);
      hasher.reset();

      // Iterations
      for (let i = 1; i < this.cfg.iterations; i++) {
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
