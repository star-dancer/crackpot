// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable @typescript-eslint/ban-ts-comment,eslint-comments/no-duplicate-disable */
import { BufferedBlockAlgorithmConfig } from "@/typings/core/buffered-block-algorithm.typing";
import { Formatter } from "@/typings/format/format.typing";

import { Cipher } from "./Cipher";
import { CipherParams } from "./CipherParams";
import { OpenSSL } from "./OpenSSL";
import { OpenSSLKdf } from "./OpenSSLKdf";
import { SerializableCipher } from "./SerializableCipher";
import { WordArray } from "./WordArray";

export class PasswordBasedCipher {
  public static cfg: BufferedBlockAlgorithmConfig = {
    blockSize: 4,
    iv: new WordArray([]),
    // @ts-ignore
    format: OpenSSL,
    // @ts-ignore
    kdf: OpenSSLKdf
  };

  /**
   * Encrypts a message using a password.
   *
   * @param cipher The cipher algorithm to use.
   * @param message The message to encrypt.
   * @param password The password.
   * @param cfg (Optional) The configuration options to use for this operation.
   * @returns A cipher params object.
   * @example
   *
   *     var ciphertextParams = CryptoJS.lib.PasswordBasedCipher.encrypt(AES, message, 'password');
   *     var ciphertextParams = CryptoJS.lib.PasswordBasedCipher.encrypt(AES, message, 'password', { format: OpenSSL });
   */
  public static encrypt(
    cipher: typeof Cipher,
    message: WordArray | string,
    password: string,
    cfg?: BufferedBlockAlgorithmConfig
  ): CipherParams {
    // Apply config defaults
    const config = Object.assign({}, this.cfg, cfg);

    // Check if we have a kdf
    if (config.kdf === undefined) {
      throw new Error("missing kdf in config");
    }

    // Derive key and other params
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const derivedParams: CipherParams = config.kdf.execute(
      password,
      cipher.keySize,
      cipher.ivSize
    );

    // Check if we have an IV
    if (derivedParams.iv !== undefined) {
      // Add IV to config
      config.iv = derivedParams.iv;
    }

    // Encrypt
    const ciphertext: CipherParams = SerializableCipher.encrypt.call(
      this,
      cipher,
      message,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //   @ts-ignore
      derivedParams.key,
      config
    );

    // Mix in derived params
    return ciphertext.extend(derivedParams);
  }

  /**
   * Decrypts serialized ciphertext using a password.
   *
   * @param cipher The cipher algorithm to use.
   * @param ciphertext The ciphertext to decrypt.
   * @param password The password.
   * @param cfg (Optional) The configuration options to use for this operation.
   * @returns The plaintext.
   * @example
   *
   *     var plaintext = PasswordBasedCipher.decrypt(AES, formattedCiphertext, 'password', { format: OpenSSL });
   *     var plaintext = PasswordBasedCipher.decrypt(AES, ciphertextParams, 'password', { format: OpenSSL });
   */
  public static decrypt(
    cipher: typeof Cipher,
    ciphertext: CipherParams | string,
    password: string,
    cfg?: BufferedBlockAlgorithmConfig
  ): WordArray {
    // Apply config defaults
    const config = Object.assign({}, this.cfg, cfg);

    // Check if we have a kdf
    if (config.format === undefined) {
      throw new Error("missing format in config");
    }

    // Convert string to CipherParams
    ciphertext = this._parse(ciphertext, config.format);

    // Check if we have a kdf
    if (config.kdf === undefined) {
      throw new Error("the key derivation function must be set");
    }

    // Derive key and other params
    const derivedParams = config.kdf.execute(
      password,
      cipher.keySize,
      cipher.ivSize,
      ciphertext.salt
    );

    // Check if we have an IV
    if (derivedParams.iv !== undefined) {
      // Add IV to config
      config.iv = derivedParams.iv;
    }

    // Decrypt
    const plaintext = SerializableCipher.decrypt.call(
      this,
      cipher,
      ciphertext,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //   @ts-ignore
      derivedParams.key,
      config
    );

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
