import { Hex } from "@/enc/hex";
import { Encoding } from "@/typings/core/encoding.typing";

export class WordArray {
  public words: number[];
  public sigBytes: number;
  constructor(words?: number[], sigBytes?: number) {
    words = this.words = words || [];
    this.sigBytes = sigBytes !== undefined ? sigBytes : words.length * 4;
  }

  toString(encoder?: Encoding): string {
    return (encoder || Hex).stringify(this);
  }

  concat(wordArray: WordArray): WordArray {
    const thatWords = wordArray.words;
    const thatSigBytes = wordArray.sigBytes;

    this.clamp();

    if (this.sigBytes % 4) {
      for (let i = 0; i < thatSigBytes; i++) {
        const thatByte = (thatWords[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
        this.words[(this.sigBytes + i) >>> 2] |=
          thatByte << (24 - ((this.sigBytes + 1) % 4) * 8);
      }
    } else {
      for (let i = 0; i < thatSigBytes; i += 4) {
        this.words[(this.sigBytes + i) >>> 2] = thatWords[i >>> 2];
      }
    }
    this.sigBytes += thatSigBytes;
    return this;
  }

  clamp(): void {
    this.words[this.sigBytes >>> 2] &=
      0xff_ff_ff_ff << (32 - (this.sigBytes % 4) * 8);
    this.words.length = Math.ceil(this.sigBytes / 4);
  }

  clone(): WordArray {
    return new WordArray([...this.words], this.sigBytes);
  }
}
