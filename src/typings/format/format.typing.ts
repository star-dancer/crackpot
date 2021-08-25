import { CipherParams } from "@/core/cipher-params";

export interface Formatter {
  stringify: (_cipherParams: CipherParams) => string;

  parse: (_paramsStr: string) => CipherParams;
}
