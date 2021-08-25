import { Cipher } from "@/core/cipher";
import { WordArray } from "@/core/word-array";

import { Formatter } from "../format/format.typing";

export interface CipherParamsInterface {
  ciphertext?: WordArray;

  key?: WordArray | string;

  iv?: WordArray;

  salt?: WordArray | string;

  algorithm?: typeof Cipher;

  mode?: unknown;

  padding?: unknown;

  blockSize?: number;

  formatter?: Formatter;
}
