import { WordArray } from "@/core/word-array";

import { Formatter } from "../format/format.typing";
import { KDF } from "../kdf/kdf.typing";

export interface BufferedBlockAlgorithmConfig {
  blockSize: number;
  iv?: WordArray;

  outputLength?: number;

  format?: Formatter;

  kdf?: KDF;
}
