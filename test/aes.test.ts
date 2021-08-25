import { Utf8 } from "@/enc/utf8";
import { OpenSSL } from "@/format/openSSL";
import { OpenSSLKdf } from "@/kdf/openSSL-kdf";
import { CBC } from "@/mode/CBC";
import { ECB } from "@/mode/ECB";
import { NoPadding } from "@/pad/no-padding";
import { PKCS7 } from "@/pad/pkcs7";

import { AES } from "../src";

const test = AES.encrypt("123", "12345678901234567890123456789012", {
  mode: CBC,
  blockSize: 256,
  padding: NoPadding,
  kdf: OpenSSLKdf
});
const result = test.toString(OpenSSL);
console.log(result);
console.log(
  AES.decrypt(result, "123", {
    mode: ECB,
    blockSize: 8,
    padding: PKCS7,
    kdf: OpenSSLKdf
  }).toString()
);