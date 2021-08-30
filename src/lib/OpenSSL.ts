// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable unicorn/prefer-spread */
import { Formatter } from "@/typings/format/format.typing";

import { CipherParams } from "./CipherParams";
import { Base64 } from "./enc/Base64";
import { WordArray } from "./WordArray";

export class OpenSSL {
  /**
   * Converts a cipher params object to an OpenSSL-compatible string.
   *
   * @param cipherParams The cipher params object.
   * @returns The OpenSSL-compatible string.
   * @example
   *
   *     let openSSLString = OpenSSLFormatter.stringify(cipherParams);
   */
  public static stringify(cipherParams: CipherParams): string {
    if (!cipherParams.ciphertext) {
      throw new Error("missing ciphertext in params");
    }

    // Shortcuts
    const ciphertext = cipherParams.ciphertext;
    const salt = cipherParams.salt;

    // Format
    let wordArray: WordArray;
    if (salt) {
      if (typeof salt === "string") {
        throw new TypeError("salt is expected to be a WordArray");
      }

      wordArray = new WordArray([0x53_61_6c_74, 0x65_64_5f_5f])
        .concat(salt)
        .concat(ciphertext);
    } else {
      wordArray = ciphertext;
    }

    return wordArray.toString(Base64);
  }

  /**
   * Converts an OpenSSL-compatible string to a cipher params object.
   *
   * @param openSSLStr The OpenSSL-compatible string.
   * @returns The cipher params object.
   * @example
   *
   *     let cipherParams = OpenSSLFormatter.parse(openSSLString);
   */
  public static parse(openSSLStr: string): CipherParams {
    // Parse base64
    const ciphertext = Base64.parse(openSSLStr);

    // Test for salt
    let salt: WordArray | undefined;
    if (
      ciphertext.words[0] === 0x53_61_6c_74 &&
      ciphertext.words[1] === 0x65_64_5f_5f
    ) {
      // Extract salt
      salt = new WordArray(ciphertext.words.slice(2, 4));

      // Remove salt from ciphertext
      ciphertext.words.splice(0, 4);
      ciphertext.sigBytes -= 16;
    }

    return new CipherParams({ ciphertext: ciphertext, salt: salt });
  }
}

// type guard for OpenSSL formatter (to ensure it has the required static methods)
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const _: Formatter = OpenSSL;
