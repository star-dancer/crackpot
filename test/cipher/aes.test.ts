import { Base64 } from "@/enc/base64";
import { Utf8 } from "@/enc/utf8";

import { AES } from "../../src";
import { TestConstant } from "../constant/test.constant";
const config = {
  iv: Base64.parse("12345678123456789090")
};
const test = AES.encrypt(TestConstant.TEST_STR, TestConstant.TEST_KEY, config);

const result = test.toString();
console.log(result);

const ending = AES.decrypt(result, TestConstant.TEST_KEY, config).toString(
  Utf8
);
console.log(ending);
