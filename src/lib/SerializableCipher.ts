// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable @typescript-eslint/no-explicit-any */
import { BufferedBlockAlgorithmConfig } from "@/typings/core/buffered-block-algorithm.typing";
import { Formatter } from "@/typings/format/format.typing";

import { Cipher } from "./Cipher";
import { CipherParams } from "./CipherParams";
import { OpenSSL } from "./OpenSSL";
import { WordArray } from "./WordArray";

export class SerializableCipher {
  public static cfg: BufferedBlockAlgorithmConfig = {
    blockSize: 4,
    iv: new WordArray([]),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    format: OpenSSL
  };

  /**
   * Encrypts a message.
   *
   * @param cipher The cipher algorithm to use.
   * @param message The message to encrypt.
   * @param key The key.
   * @param cfg (Optional) The configuration options to use for this operation.
   * @returns A cipher params object.
   * @example
   *
   *     let ciphertextParams = SerializableCipher.encrypt(CryptoJS.algo.AES, message, key);
   *     let ciphertextParams = SerializableCipher.encrypt(CryptoJS.algo.AES, message, key, { iv: iv });
   *     let ciphertextParams = SerializableCipher.encrypt(CryptoJS.algo.AES, message, key, {
   *       iv: iv,
   *       format: CryptoJS.format.OpenSSL
   *     });
   */
  public static encrypt(
    cipher: typeof Cipher,
    message: WordArray | string,
    key: WordArray,
    cfg?: BufferedBlockAlgorithmConfig
  ): CipherParams {
    // Apply config defaults
    const config = Object.assign({}, this.cfg, cfg);

    // Encrypt
    const encryptor = cipher.createEncryptor(key, config);
    const ciphertext = encryptor.finalize(message);

    // Create and return serializable cipher params
    return new CipherParams({
      ciphertext: ciphertext,
      key: key,
      iv: encryptor.cfg.iv,
      algorithm: cipher,
      mode: (<any>encryptor.cfg).mode,
      padding: (<any>encryptor.cfg).padding,
      blockSize: encryptor.cfg.blockSize,
      formatter: config.format
    });
  }

  /**
   * Decrypts serialized ciphertext.
   *
   * @param cipher The cipher algorithm to use.
   * @param ciphertext The ciphertext to decrypt.
   * @param key The key.
   * @param cfg (Optional) The configuration options to use for this operation.
   * @param optionalCfg
   * @returns The plaintext.
   * @example
   *
   *     let plaintext = SerializableCipher.decrypt(
   *         AESAlgorithm,
   *         formattedCiphertext,
   *         key, {
   *             iv: iv,
   *             format: CryptoJS.format.OpenSSL
   *         }
   *     );
   *
   *     let plaintext = SerializableCipher.decrypt(
   *         AESAlgorithm,
   *         ciphertextParams,
   *         key, {
   *             iv: iv,
   *             format: CryptoJS.format.OpenSSL
   *         }
   *     );
   */
  public static decrypt(
    cipher: typeof Cipher,
    ciphertext: CipherParams | string,
    key: WordArray,
    optionalCfg?: BufferedBlockAlgorithmConfig
  ): WordArray {
    // Apply config defaults
    const cfg = Object.assign({}, this.cfg, optionalCfg);

    if (!cfg.format) {
      throw new Error("could not determine format");
    }

    // Convert string to CipherParams
    ciphertext = this._parse(ciphertext, cfg.format);

    if (!ciphertext.ciphertext) {
      throw new Error("could not determine ciphertext");
    }

    // Decrypt
    const plaintext = cipher
      .createDecryptor(key, cfg)
      .finalize(ciphertext.ciphertext);

    return plaintext;
  }

  /**
   * Converts serialized ciphertext to CipherParams,
   * else assumed CipherParams already and returns ciphertext unchanged.
   *
   * @param ciphertext The ciphertext.
   * @param format The formatting strategy to use to parse serialized ciphertext.
   * @returns The unserialized ciphertext.
   * @example
   *
   *     var ciphertextParams = CryptoJS.lib.SerializableCipher._parse(ciphertextStringOrParams, format);
   */
  public static _parse(
    ciphertext: CipherParams | string,
    format: Formatter
  ): CipherParams {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //   @ts-ignore
    return typeof ciphertext === "string"
      ? format.parse(ciphertext)
      : ciphertext;
  }
}
