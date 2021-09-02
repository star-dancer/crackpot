import { DES, enc } from "../../lib/index.cjs";
import { TestConstant } from "../constant/test.constant";

const mineResult = DES.encrypt(TestConstant.TEST_STR, TestConstant.TEST_KEY);
console.log(mineResult.toString());
console.log(
  DES.decrypt(mineResult.toString(), TestConstant.TEST_KEY).toString(enc.Utf8)
);

const otherResult = "U2FsdGVkX18qimC7cE2KFWpIU4Dfd/D4rR5UduO19W8=";

console.log(DES.decrypt(otherResult, TestConstant.TEST_KEY).toString(enc.Utf8));
