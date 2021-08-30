import { WordArray } from "../WordArray";
import { Encoding } from "./Encoding";
import { Latin1 } from "./Latin1";

export class Utf8 {
  /**
   * Converts a word array to a UTF-8 string.
   *
   * @param wordArray The word array.
   * @returns The UTF-8 string.
   * @example
   *
   *     let utf8String = Utf8.stringify(wordArray);
   */
  public static stringify(wordArray: WordArray): string {
    try {
      return decodeURIComponent(escape(Latin1.stringify(wordArray)));
    } catch {
      throw new Error("Malformed UTF-8 data");
    }
  }

  /**
   * Converts a UTF-8 string to a word array.
   *
   * @param utf8Str The UTF-8 string.
   * @returns The word array.
   * @example
   *
   *     let wordArray = Utf8.parse(utf8String);
   */
  public static parse(utf8Str: string): WordArray {
    return Latin1.parse(unescape(encodeURIComponent(utf8Str)));
  }
}

// type guard for the formatter (to ensure it has the required static methods)
const _: Encoding = Utf8;
