import { BufferedBlockAlgorithmConfig } from "@/typings/core/buffered-block-algorithm.typing";
import { CipherConfig, CipherHelper } from "@/typings/core/cipher.typing";
import { CipherStrategy } from "@/typings/core/cipher-strategy.typing";

import { BufferedBlockAlgorithm } from "./buffered-block-algorithm";
import { CipherParams } from "./cipher-params";
import { PasswordBasedCipher } from "./password-based-cipher";
import { SerializableCipher } from "./serializable-cipher";
import { WordArray } from "./word-array";

export abstract class Cipher extends BufferedBlockAlgorithm {
  public static keySize = 128 / 32;
  public static ivSize = 128 / 32;
  public static createEncryptor(key: WordArray, cfg: CipherConfig): Cipher {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any,unicorn/no-this-assignment,@typescript-eslint/no-this-alias
    const thisClass: any = this;
    return new thisClass(this._ENC_XFORM_MODE, key, cfg);
  }

  public static createDecryptor(key: WordArray, cfg: CipherConfig): Cipher {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any,unicorn/no-this-assignment,@typescript-eslint/no-this-alias
    const thisClass: any = this;
    return new thisClass(this._ENC_XFORM_MODE, key, cfg);
  }

  public cfg: CipherConfig;
  public _xformMode: number;
  public _key: WordArray;
  public static _ENC_XFORM_MODE = 1;
  public static _DEC_XFORM_MODE = 2;
  constructor(xformMode: number, key: WordArray, cfg: CipherConfig) {
    super();
    this.cfg = cfg;
    this._xformMode = xformMode;
    this._key = key;

    this.reset();
  }
  public process(dataUpdate: WordArray | string): WordArray {
    this._append(dataUpdate);
    return this._process();
  }
  public finalize(dataUpdate?: WordArray | string): WordArray {
    if (dataUpdate) {
      this._append(dataUpdate);
    }
    const finalProcessedData = this._doFinalize();
    return finalProcessedData;
  }
  public static _createHelper(cipher: typeof Cipher): CipherHelper {
    // eslint-disable-next-line unicorn/consistent-function-scoping
    const selectCipherStrategy: (_key: string | WordArray) => CipherStrategy = (
      key: string | WordArray
      // eslint-disable-next-line unicorn/consistent-function-scoping
    ) => {
      if (typeof key === "string") {
        return PasswordBasedCipher;
      }
      return SerializableCipher;
    };
    return {
      encrypt(
        message: WordArray | string,
        key: WordArray | string,
        cfg?: BufferedBlockAlgorithmConfig
      ): CipherParams {
        return selectCipherStrategy(key).encrypt(cipher, message, key, cfg);
      },
      decrypt(
        ciphertext: CipherParams | string,
        key: WordArray | string,
        cfg?: BufferedBlockAlgorithmConfig
      ) {
        return selectCipherStrategy(key).decrypt(cipher, ciphertext, key, cfg);
      }
    };
  }

  _doProcessBlock(_wordArray: number[], _offset: number): void {
    throw new Error("Method not implemented.");
  }

  public abstract _doFinalize(): WordArray;
}