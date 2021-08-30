// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { BufferedBlockAlgorithmConfig } from "@/typings/core/buffered-block-algorithm.typing";

import { BlockCipherModeAlgorithm } from "./BlockCipherModeAlgorithm";
import { CBC } from "./CBC";
import { Cipher } from "./Cipher";
import { PKCS7 } from "./PKCS7";
import { WordArray } from "./WordArray";

export abstract class BlockCipher extends Cipher {
  public _mode!: BlockCipherModeAlgorithm;

  constructor(
    xformMode: number,
    key: WordArray,
    cfg?: BufferedBlockAlgorithmConfig
  ) {
    super(
      xformMode,
      key,
      Object.assign(
        {
          // default: 128 / 32
          blockSize: 4,
          mode: CBC,
          padding: PKCS7
        },
        cfg
      )
    );
  }

  public reset() {
    // Reset cipher
    super.reset();

    // Check if we have a blockSize
    if (this.cfg.mode === undefined) {
      throw new Error("missing mode in config");
    }

    // Reset block mode
    let modeCreator;
    if (
      this._xformMode === (<typeof BlockCipher>this.constructor)._ENC_XFORM_MODE
    ) {
      modeCreator = this.cfg.mode.createEncryptor;
    } /* if (this._xformMode == this._DEC_XFORM_MODE) */ else {
      modeCreator = this.cfg.mode.createDecryptor;
      // Keep at least one block in the buffer for unpadding
      this._minBufferSize = 1;
    }

    // @ts-ignore
    if (this._mode && this._mode.__creator === modeCreator) {
      // @ts-ignore
      this._mode.init(this, this.cfg.iv && this.cfg.iv.words);
    } else {
      // @ts-ignore
      this._mode = modeCreator.call(
        this.cfg.mode,
        // @ts-ignore
        this,
        // @ts-ignore
        this.cfg.iv && this.cfg.iv.words
      );
      // @ts-ignore
      this._mode.__creator = modeCreator;
    }
  }

  public abstract encryptBlock(M: Array<number>, offset: number): void;
  public abstract decryptBlock(M: Array<number>, offset: number): void;
  _doProcessBlock(words: Array<number>, offset: number) {
    this._mode.processBlock(words, offset);
  }

  _doFinalize() {
    // Check if we have a padding strategy
    if (this.cfg.padding === undefined) {
      throw new Error("missing padding in config");
    }

    // Finalize
    let finalProcessedBlocks;
    if (
      this._xformMode === (<typeof BlockCipher>this.constructor)._ENC_XFORM_MODE
    ) {
      // Check if we have a blockSize
      if (this.cfg.blockSize === undefined) {
        throw new Error("missing blockSize in config");
      }

      // Pad data
      this.cfg.padding.pad(this._data, this.cfg.blockSize);

      // Process final blocks
      finalProcessedBlocks = this._process(!!"flush");
    } /* if (this._xformMode == this._DEC_XFORM_MODE) */ else {
      // Process final blocks
      finalProcessedBlocks = this._process(!!"flush");

      // Unpad data
      this.cfg.padding.unpad(finalProcessedBlocks);
    }

    return finalProcessedBlocks;
  }
}
