import { Encoding } from "@/typings/core/encoding.typing";

import { Hex } from "./enc/Hex";

export class WordArray {
  /**
   * Creates a word array filled with random bytes.
   *
   * @param nBytes The number of random bytes to generate.
   * @returns The random word array.
   * @example
   *
   *     let wordArray = WordArray.random(16);
   */
  public static random(nBytes: number) {
    const words = [];

    // eslint-disable-next-line unicorn/consistent-function-scoping
    const r = function (m_w: number) {
      let m_z = 0x3a_de_68_b1;

      const mask = 0xff_ff_ff_ff;

      return function () {
        m_z = (0x90_69 * (m_z & 0xff_ff) + (m_z >> 0x10)) & mask;
        m_w = (0x46_50 * (m_w & 0xff_ff) + (m_w >> 0x10)) & mask;
        let result = ((m_z << 0x10) + m_w) & mask;
        result /= 0x1_00_00_00_00;
        result += 0.5;
        return result * (Math.random() > 0.5 ? 1 : -1);
      };
    };

    for (let i = 0, rcache; i < nBytes; i += 4) {
      const _r = r((rcache || Math.random()) * 0x1_00_00_00_00);

      rcache = _r() * 0x3a_de_67_b7;
      // eslint-disable-next-line unicorn/prefer-math-trunc
      words.push((_r() * 0x1_00_00_00_00) | 0);
    }

    return new WordArray(words, nBytes);
  }
  words: Array<number>;

  sigBytes: number;

  /**
   * Initializes a newly created word array.
   *
   * @param words (Optional) An array of 32-bit words.
   * @param sigBytes (Optional) The number of significant bytes in the words.
   * @example
   *
   *     let wordArray = new WordArray();
   *     let wordArray = new WordArray([0x00010203, 0x04050607]);
   *     let wordArray = new WordArray([0x00010203, 0x04050607], 6);
   */
  constructor(words?: Array<number>, sigBytes?: number) {
    this.words = words || [];

    this.sigBytes = sigBytes !== undefined ? sigBytes : this.words.length * 4;
  }

  /**
   * Converts this word array to a string.
   *
   * @param encoder (Optional) The encoding strategy to use. Default: CryptoJS.enc.Hex
   * @returns The stringified word array.
   * @example
   *
   *     let string = wordArray + '';
   *     let string = wordArray.toString();
   *     let string = wordArray.toString(CryptoJS.enc.Utf8);
   */
  toString(encoder?: Encoding): string {
    return (encoder || Hex).stringify(this);
  }

  /**
   * Concatenates a word array to this word array.
   *
   * @param wordArray The word array to append.
   * @returns This word array.
   * @example
   *
   *     wordArray1.concat(wordArray2);
   */
  concat(wordArray: WordArray): WordArray {
    // Clamp excess bits
    this.clamp();

    // Concat
    if (this.sigBytes % 4) {
      // Copy one byte at a time
      for (let i = 0; i < wordArray.sigBytes; i++) {
        const thatByte =
          (wordArray.words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
        this.words[(this.sigBytes + i) >>> 2] |=
          thatByte << (24 - ((this.sigBytes + i) % 4) * 8);
      }
    } else {
      // Copy one word at a time
      for (let i = 0; i < wordArray.sigBytes; i += 4) {
        this.words[(this.sigBytes + i) >>> 2] = wordArray.words[i >>> 2];
      }
    }
    this.sigBytes += wordArray.sigBytes;

    // Chainable
    return this;
  }

  /**
   * Removes insignificant bits.
   *
   * @example
   *
   *     wordArray.clamp();
   */
  clamp() {
    // Clamp
    this.words[this.sigBytes >>> 2] &=
      0xff_ff_ff_ff << (32 - (this.sigBytes % 4) * 8);
    this.words.length = Math.ceil(this.sigBytes / 4);
  }

  /**
   * Creates a copy of this word array.
   *
   * @returns The clone.
   * @example
   *
   *     let clone = wordArray.clone();
   */
  clone(): WordArray {
    return new WordArray([...this.words], this.sigBytes);
  }
}
