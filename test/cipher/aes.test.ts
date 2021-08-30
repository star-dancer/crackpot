import { Base64 } from "@/enc/base64";
import { Utf8 } from "@/enc/utf8";

import { AES } from "../../src";
import { TestConstant } from "../constant/test.constant";
const config = {
  iv: Base64.parse("1234567812345678")
};
const test = AES.encrypt(
  Base64.parse(TestConstant.TEST_STR),
  Base64.parse(TestConstant.TEST_KEY),
  config
);
const result = test.toString();
console.log(result);
const ending = AES.decrypt(
  result,
  Base64.parse(TestConstant.TEST_KEY),
  config
).toString(Utf8);
console.log(ending);
