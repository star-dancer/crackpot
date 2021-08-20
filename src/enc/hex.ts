import { WordArray } from "../core/word-array";
import { Encoding } from "../typings/core/encoding.typing";

export const Hex: Encoding = {
  stringify(wordArray: WordArray): string {
    const { words, sigBytes } = wordArray;

    const hexChars: string[] = [];
    for (let i = 0; i < sigBytes; i++) {
      const bite = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
      hexChars.push((bite >>> 4).toString(16), (bite & 0x0f).toString(16));
    }
    return hexChars.join("");
  },

  parse(hexStr: string): WordArray {
    const hexStrLength = hexStr.length;

    const words: number[] = [];
    for (let i = 0; i < hexStrLength; i += 2) {
      words[i >>> 3] |=
        Number.parseInt(hexStr.slice(i, 3), 16) << (24 - (i % 8) * 4);
    }
    return new WordArray(words, hexStrLength / 2);
  }
};
