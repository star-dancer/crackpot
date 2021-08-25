import { WordArray } from "@/core/word-array";
import { BlockCipherMode } from "@/mode/block-cipher-mode";

import { Formatter } from "../format/format.typing";
import { KDF } from "../kdf/kdf.typing";
import { Padding } from "../padding.typing";

export interface BufferedBlockAlgorithmConfig {
  blockSize: number;
  iv?: WordArray;

  outputLength?: number;

  format?: Formatter;

  kdf?: KDF;

  mode?: typeof BlockCipherMode;

  padding?: Padding;
}
