import { Formatter } from "@/typings/format/format.typing";
import { KDF } from "@/typings/kdf/kdf.typing";
import { Padding } from "@/typings/padding.typing";

import { BlockCipherMode } from "./BlockCipherMode";
import { WordArray } from "./WordArray";

export interface BufferedBlockAlgorithmConfig {
  // requires at least a blockSize
  blockSize?: number;

  iv?: WordArray;

  format?: Formatter;

  kdf?: KDF;

  mode?: typeof BlockCipherMode;

  padding?: Padding;
}
