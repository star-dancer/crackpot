import { OpenSSL } from "@/format/openSSL";
import { BufferedBlockAlgorithmConfig } from "@/typings/core/buffered-block-algorithm.typing";
import { CipherStrategy } from "@/typings/core/cipher-strategy.typing";
import { Formatter } from "@/typings/format/format.typing";

import { WordArray } from "../word-array";
import { Cipher } from "./cipher";
import { CipherParams } from "./cipher-params";

/**
 * 密码包装器，将密码文本作为可序列化的密码参数对象返回
 */
export const SerializableCipher: CipherStrategy = {
  cfg: {
    iv: new WordArray([]),
    format: OpenSSL
  } as BufferedBlockAlgorithmConfig,

  encrypt(
    cipher: typeof Cipher,
    message: WordArray | string,
    key: WordArray,
    cfg?: BufferedBlockAlgorithmConfig
  ): CipherParams {
    const config = Object.assign({}, this.cfg, cfg);

    const encryptor = cipher.createEncryptor(key, config);
    const ciphertext = encryptor.finalize(message);
    return new CipherParams({
      ciphertext,
      key,
      iv: encryptor.cfg.iv,
      algorithm: cipher,
      mode: encryptor.cfg.mode,
      padding: encryptor.cfg.padding,
      blockSize: encryptor.cfg.blockSize,
      formatter: config.format
    });
  },

  decrypt(
    cipher: typeof Cipher,
    ciphertext: CipherParams | string,
    key: WordArray,
    optionalCfg?: BufferedBlockAlgorithmConfig
  ): WordArray {
    const cfg = Object.assign({}, this.cfg, optionalCfg);
    if (!cfg.format) {
      throw new Error("could not datermine format");
    }

    ciphertext = this._parse(ciphertext, cfg.format);

    if (!ciphertext.ciphertext) {
      throw new Error("could not datermine ciphertext");
    }

    const plaintext = cipher
      .createDecryptor(key, cfg)
      .finalize(ciphertext.ciphertext);

    return plaintext;
  },
  _parse(ciphertext: CipherParams | string, format: Formatter): CipherParams {
    return typeof ciphertext === "string"
      ? format.parse(ciphertext)
      : ciphertext;
  }
};
