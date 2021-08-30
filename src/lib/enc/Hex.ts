import { WordArray } from "../WordArray";
import { Encoding } from "./Encoding";

export class Hex {
  /**
   * Converts a word array to a hex string.
   *
   * @param wordArray The word array.
   * @returns The hex string.
   * @example
   *
   *     let hexString = Hex.stringify(wordArray);
   */
  public static stringify(wordArray: WordArray): string {
    // Convert
    const hexChars: Array<string> = [];
    for (let i = 0; i < wordArray.sigBytes; i++) {
      const bite = (wordArray.words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
      hexChars.push((bite >>> 4).toString(16), (bite & 0x0f).toString(16));
    }

    return hexChars.join("");
  }

  /**
   * Converts a hex string to a word array.
   *
   * @param hexStr The hex string.
   * @returns The word array.
   * @example
   *
   *     let wordArray = Hex.parse(hexString);
   */
  public static parse(hexStr: string): WordArray {
    // Shortcut
    const hexStrLength = hexStr.length;

    // Convert
    const words: Array<number> = [];
    for (let i = 0; i < hexStrLength; i += 2) {
      words[i >>> 3] |=
        // eslint-disable-next-line unicorn/prefer-string-slice
        Number.parseInt(hexStr.substr(i, 2), 16) << (24 - (i % 8) * 4);
    }

    return new WordArray(words, hexStrLength / 2);
  }
}

// type guard for the formatter (to ensure it has the required static methods)
const _: Encoding = Hex;
