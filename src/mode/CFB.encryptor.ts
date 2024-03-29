import { BlockCipher } from "@/core/cipher/block-cipher";

import { BlockCipherModeAlgorithm } from "./block-cipher-mode-algorithm";

export class CFBEncryptor extends BlockCipherModeAlgorithm {
  public _prevBlock!: number[];
  public processBlock(words: number[], offset: number): void {
    // Shortcuts
    const cipher = this._cipher;
    const blockSize = cipher.cfg.blockSize;

    if (blockSize === undefined) {
      throw new Error("block size is undefined");
    }

    this.generateKeystreamAndEncrypt.call(
      this,
      words,
      offset,
      blockSize,
      cipher
    );

    // Remember this block to use with next block
    this._prevBlock = words.slice(offset, offset + blockSize);
  }

  generateKeystreamAndEncrypt(
    words: number[],
    offset: number,
    blockSize: number,
    cipher: BlockCipher
  ): void {
    let keystream: number[];

    // Shortcut
    const iv = this._iv;

    // Generate keystream
    if (iv) {
      keystream = [...iv];

      // Remove IV for subsequent blocks
      this._iv = undefined;
    } else {
      keystream = this._prevBlock;
    }
    cipher.encryptBlock(keystream, 0);

    // Encrypt
    for (let i = 0; i < blockSize; i++) {
      words[offset + i] ^= keystream[i];
    }
  }
}
