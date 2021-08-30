// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable @typescript-eslint/no-explicit-any,@typescript-eslint/no-this-alias,unicorn/no-this-assignment,@typescript-eslint/ban-ts-comment */
import { BufferedBlockAlgorithmConfig } from "@/typings/core/buffered-block-algorithm.typing";

import { BufferedBlockAlgorithm } from "./BufferedBlockAlgorithm";
import { CipherParams } from "./CipherParams";
import { PasswordBasedCipher } from "./PasswordBasedCipher";
import { SerializableCipher } from "./SerializableCipher";
import { WordArray } from "./WordArray";

export abstract class Cipher extends BufferedBlockAlgorithm {
  /**
   * This cipher's key size. Default: 4 (128 bits / 32 Bits)
   */
  public static keySize = 4;
  /**
   * This cipher's IV size. Default: 4 (128 bits / 32 Bits)
   */
  public static ivSize = 4;
  /**
   * Creates this cipher in encryption mode.
   *
   * @param key The key.
   * @param cfg (Optional) The configuration options to use for this operation.
   * @returns A cipher instance.
   * @example
   *
   *     let cipher = AES.createEncryptor(keyWordArray, { iv: ivWordArray });
   */
  public static createEncryptor(
    key: WordArray,
    cfg?: BufferedBlockAlgorithmConfig
  ): Cipher {
    // workaround for typescript not being able to create a abstract creator function directly
    const thisClass: any = this;

    return new thisClass(this._ENC_XFORM_MODE, key, cfg);
  }
  /**
   * Creates this cipher in decryption mode.
   *
   * @param key The key.
   * @param cfg (Optional) The configuration options to use for this operation.
   * @returns A cipher instance.
   * @example
   *
   *     let cipher = AES.createDecryptor(keyWordArray, { iv: ivWordArray });
   */
  public static createDecryptor(
    key: WordArray,
    cfg?: BufferedBlockAlgorithmConfig
  ): Cipher {
    // workaround for typescript not being able to create a abstract creator function directly
    const thisClass: any = this;

    return new thisClass(this._DEC_XFORM_MODE, key, cfg);
  }
  /**
   * A constant representing encryption mode.
   */
  public static _ENC_XFORM_MODE = 1;

  /**
   * A constant representing decryption mode.
   */
  public static _DEC_XFORM_MODE = 2;

  /**
   * Either the encryption or decryption transformation mode constant.
   */
  public _xformMode: number;

  /**
   * The key.
   */
  public _key: WordArray;

  /**
   * Initializes a newly created cipher.
   *
   * @param xformMode Either the encryption or decryption transormation mode constant.
   * @param key The key.
   * @param cfg (Optional) The configuration options to use for this operation.
   * @example
   *
   *     let cipher = AES.create(AES._ENC_XFORM_MODE, keyWordArray, { iv: ivWordArray });
   */
  public constructor(
    xformMode: number,
    key: WordArray,
    cfg?: BufferedBlockAlgorithmConfig
  ) {
    // Apply config defaults
    super(
      // @ts-ignore
      Object.assign(
        {
          blockSize: 1
        },
        cfg
      )
    );

    // Store transform mode and key
    this._xformMode = xformMode;
    this._key = key;

    // Set initial values
    this.reset();
  }
  /**
   * Adds data to be encrypted or decrypted.
   *
   * @param dataUpdate The data to encrypt or decrypt.
   * @returns The data after processing.
   * @example
   *
   *     let encrypted = cipher.process('data');
   *     let encrypted = cipher.process(wordArray);
   */
  public process(dataUpdate: WordArray | string): WordArray {
    // Append
    this._append(dataUpdate);

    // Process available blocks
    return this._process();
  }
  /**
   * Finalizes the encryption or decryption process.
   * Note that the finalize operation is effectively a destructive, read-once operation.
   *
   * @param dataUpdate The final data to encrypt or decrypt.
   * @returns The data after final processing.
   * @example
   *
   *     var encrypted = cipher.finalize();
   *     var encrypted = cipher.finalize('data');
   *     var encrypted = cipher.finalize(wordArray);
   */
  public finalize(dataUpdate?: WordArray | string): WordArray {
    // Final data update
    if (dataUpdate) {
      this._append(dataUpdate);
    }

    // Perform concrete-cipher logic
    const finalProcessedData = this._doFinalize();

    return finalProcessedData;
  }
  /**
   * Creates shortcut functions to a cipher's object interface.
   *
   * @param cipher The cipher to create a helper for.
   * @returns An object with encrypt and decrypt shortcut functions.
   * @example
   *
   *     let AES = Cipher._createHelper(AESAlgorithm);
   */
  public static _createHelper(cipher: typeof Cipher) {
    function encrypt(
      message: WordArray | string,
      key: WordArray | string,
      cfg?: BufferedBlockAlgorithmConfig
    ) {
      return typeof key === "string"
        ? // @ts-ignore
          PasswordBasedCipher.encrypt(cipher, message, key, cfg)
        : // @ts-ignore
          SerializableCipher.encrypt(cipher, message, key, cfg);
    }

    function decrypt(
      ciphertext: CipherParams | string,
      key: WordArray | string,
      cfg?: BufferedBlockAlgorithmConfig
    ) {
      return typeof key === "string"
        ? //   @ts-ignore
          PasswordBasedCipher.decrypt(cipher, ciphertext, key, cfg)
        : // @ts-ignore
          SerializableCipher.decrypt(cipher, ciphertext, key, cfg);
    }

    return {
      encrypt: encrypt,
      decrypt: decrypt
    };
  }

  /**
   * Cipher specific finalize function explicitly implemented in the derived class.
   */
  public abstract _doFinalize(): WordArray;
}
