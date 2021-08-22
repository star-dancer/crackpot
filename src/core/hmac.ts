import { Utf8 } from "../enc/utf8";
import { Type } from "../typings/common.typing";
import { Hasher } from "./hasher";
import { WordArray } from "./word-array";

export abstract class Hmac {
  private _hasher: Hasher;

  constructor(hasher: Type<Hasher>, key: string | WordArray) {
    const hasher_t = (this._hasher = new hasher());
    if (typeof key === "string") {
      key = Utf8.parse(key);
    }

    const hashBlockSize = hasher_t.cfg.blockSize;
    const hasherBlockSizeBytes = hashBlockSize * 4;
  }
}
