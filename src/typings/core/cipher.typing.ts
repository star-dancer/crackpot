import { Cipher } from "@/core/cipher";
import { CipherParams } from "@/core/cipher-params";
import { WordArray } from "@/core/word-array";

import { BufferedBlockAlgorithmConfig } from "./buffered-block-algorithm.typing";

export interface CipherConfig extends BufferedBlockAlgorithmConfig {
  ciphertext?: WordArray;

  key?: WordArray | string;

  salt?: WordArray | string;

  algorithm?: typeof Cipher;

  mode?: unknown;

  padding?: unknown;

  formatter?: unknown;
}

export interface CipherHelper {
  encrypt(
    _message: string | WordArray,
    _key: string | WordArray,
    _cfg?: BufferedBlockAlgorithmConfig | undefined
  ): CipherParams;
  decrypt(
    _ciphertext: string | CipherParams,
    _key: string | WordArray,
    _cfg?: BufferedBlockAlgorithmConfig | undefined
  ): WordArray;
}
