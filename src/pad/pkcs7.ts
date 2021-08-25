import { WordArray } from "@/core/word-array";
import { Padding } from "@/typings/padding.typing";

export const PKCS7: Padding = {
  pad(data: WordArray, blockSize: number): void {
    const blockSizeBytes = blockSize * 4;
    const nPaddingBytes = blockSizeBytes - (data.sigBytes % blockSizeBytes);
    const paddingWord =
      (nPaddingBytes << 24) |
      (nPaddingBytes << 16) |
      (nPaddingBytes << 8) |
      nPaddingBytes;
    const paddingWords = [];

    for (let i = 0; i < nPaddingBytes; i += 4) {
      paddingWords.push(paddingWord);
    }

    const padding = new WordArray(paddingWords, nPaddingBytes);

    // eslint-disable-next-line unicorn/prefer-spread
    data.concat(padding);
  },
  unpad(data: WordArray): void {
    const nPaddingBytes = data.words[(data.sigBytes - 1) >>> 2] & 0xff;
    data.sigBytes -= nPaddingBytes;
  }
};
