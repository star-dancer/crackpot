import { TestConstant } from "test/constant/test.constant";

import { Utf8 } from "@/enc/utf8";
import { DES } from "@/index";

const mineResult = DES.encrypt(TestConstant.TEST_STR, TestConstant.TEST_KEY);
console.log(mineResult.toString());
console.log(
  DES.decrypt(mineResult.toString(), TestConstant.TEST_KEY).toString(Utf8)
);

const otherResult = "U2FsdGVkX18qimC7cE2KFWpIU4Dfd/D4rR5UduO19W8=";

console.log(DES.decrypt(otherResult, TestConstant.TEST_KEY).toString(Utf8));
