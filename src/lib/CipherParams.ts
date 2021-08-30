import { Formatter } from "@/typings/format/format.typing";
import { Padding } from "@/typings/padding.typing";

import { BlockCipherMode } from "./BlockCipherMode";
import { Cipher } from "./Cipher";
import { CipherParamsInterface } from "./CipherParamsInterface";
import { WordArray } from "./WordArray";

export class CipherParams implements CipherParamsInterface {
  ciphertext?: WordArray;

  key?: WordArray | string;

  iv?: WordArray;

  salt?: WordArray | string;

  algorithm?: typeof Cipher;

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  mode?: typeof BlockCipherMode;

  padding?: Padding;

  blockSize?: number;

  formatter?: Formatter;

  /**
   * Initializes a newly created cipher params object.
   *
   * @param cipherParams An object with any of the possible cipher parameters.
   * @example
   *
   *     let cipherParams = CipherParams.create({
   *         ciphertext: ciphertextWordArray,
   *         key: keyWordArray,
   *         iv: ivWordArray,
   *         salt: saltWordArray,
   *         algorithm: AESAlgorithm,
   *         mode: CBC,
   *         padding: PKCS7,
   *         blockSize: 4,
   *         formatter: OpenSSLFormatter
   *     });
   */
  public constructor(cipherParams: CipherParamsInterface) {
    this.ciphertext = cipherParams.ciphertext;
    this.key = cipherParams.key;
    this.iv = cipherParams.iv;
    this.salt = cipherParams.salt;
    this.algorithm = cipherParams.algorithm;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.mode = cipherParams.mode;
    this.padding = cipherParams.padding;
    this.blockSize = cipherParams.blockSize;
    this.formatter = cipherParams.formatter;
  }

  public extend(additionalParams: CipherParams): CipherParams {
    if (additionalParams.ciphertext !== undefined) {
      this.ciphertext = additionalParams.ciphertext;
    }

    if (additionalParams.key !== undefined) {
      this.key = additionalParams.key;
    }

    if (additionalParams.iv !== undefined) {
      this.iv = additionalParams.iv;
    }

    if (additionalParams.salt !== undefined) {
      this.salt = additionalParams.salt;
    }

    if (additionalParams.algorithm !== undefined) {
      this.algorithm = additionalParams.algorithm;
    }

    if (additionalParams.mode !== undefined) {
      this.mode = additionalParams.mode;
    }

    if (additionalParams.padding !== undefined) {
      this.padding = additionalParams.padding;
    }

    if (additionalParams.blockSize !== undefined) {
      this.blockSize = additionalParams.blockSize;
    }

    if (additionalParams.formatter !== undefined) {
      this.formatter = additionalParams.formatter;
    }

    return this;
  }

  /**
   * Converts this cipher params object to a string.
   *
   * @param formatter (Optional) The formatting strategy to use.
   * @returns The stringified cipher params.
   * @throws Error If neither the formatter nor the default formatter is set.
   * @example
   *
   *     let string = cipherParams + '';
   *     let string = cipherParams.toString();
   *     let string = cipherParams.toString(CryptoJS.format.OpenSSL);
   */
  public toString(formatter?: Formatter): string {
    if (formatter) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return formatter.stringify(this);
    } else if (this.formatter) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return this.formatter.stringify(this);
    } else {
      throw new Error(
        "cipher needs a formatter to be able to convert the result into a string"
      );
    }
  }
}
