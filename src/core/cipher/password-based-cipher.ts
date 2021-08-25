import { OpenSSL } from "@/format/openSSL";
import { OpenSSLKdf } from "@/kdf/openSSL-kdf";
import { BufferedBlockAlgorithmConfig } from "@/typings/core/buffered-block-algorithm.typing";
import { CipherStrategy } from "@/typings/core/cipher-strategy.typing";
import { Formatter } from "@/typings/format/format.typing";

import { WordArray } from "../word-array";
import { Cipher } from "./cipher";
import { CipherParams } from "./cipher-params";
import { SerializableCipher } from "./serializable-cipher";

export const PasswordBasedCipher: CipherStrategy = {
  cfg: {
    blockSize: 4,
    iv: new WordArray([]),
    format: OpenSSL,
    kdf: OpenSSLKdf
  },

  encrypt(
    cipher: typeof Cipher,
    message: WordArray | string,
    passwrod: string,
    cfg?: BufferedBlockAlgorithmConfig
  ): CipherParams {
    const config: BufferedBlockAlgorithmConfig = Object.assign(
      {},
      this.cfg,
      cfg
    );
    if (config.kdf === undefined) {
      throw new Error("missing kdf in config");
    }

    const derivedParams: CipherParams = config.kdf.execute(
      passwrod,
      cipher.keySize,
      cipher.ivSize
    );

    if (derivedParams.iv === undefined) {
      config.iv = derivedParams.iv;
    }

    const ciphertext: CipherParams = SerializableCipher.encrypt.call(
      this,
      cipher,
      message,
      derivedParams.key as WordArray,
      config
    );
    return ciphertext.extend(derivedParams);
  },
  decrypt(
    cipher: typeof Cipher,
    ciphertext: CipherParams | string,
    password: string,
    cfg?: BufferedBlockAlgorithmConfig
  ): WordArray {
    const config: BufferedBlockAlgorithmConfig = Object.assign(
      {},
      this.cfg,
      cfg
    );
    if (config.format === undefined) {
      throw new Error("missing format is config");
    }

    ciphertext = this._parse(ciphertext, config.format);

    if (config.kdf === undefined) {
      throw new Error("the key derivation function must be set");
    }

    const derivedParams = config.kdf.execute(
      password,
      cipher.keySize,
      cipher.ivSize,
      ciphertext.salt
    );
    if (derivedParams.iv === undefined) {
      config.iv = derivedParams.iv;
    }

    const plaintext = SerializableCipher.decrypt.call(
      this,
      cipher,
      ciphertext,
      derivedParams.key as WordArray,
      config
    );
    return plaintext;
  },
  _parse(ciphertext: CipherParams | string, format: Formatter): CipherParams {
    return typeof ciphertext === "string"
      ? format.parse(ciphertext)
      : ciphertext;
  }
};
