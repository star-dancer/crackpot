import { Formatter } from "@/typings/format/format.typing";
import { Padding } from "@/typings/padding.typing";

import { BlockCipherMode } from "./BlockCipherMode";
import { Cipher } from "./Cipher";
import { WordArray } from "./WordArray";

export interface CipherParamsInterface {
  ciphertext?: WordArray;

  key?: WordArray | string;

  iv?: WordArray;

  salt?: WordArray | string;

  algorithm?: typeof Cipher;

  mode?: typeof BlockCipherMode;

  padding?: Padding;

  blockSize?: number;

  formatter?: Formatter;
}
