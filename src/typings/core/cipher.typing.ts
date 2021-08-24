import { Cipher } from "@/core/cipher";
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
