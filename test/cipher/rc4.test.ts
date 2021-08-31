import { TestConstant } from "test/constant/test.constant";

import { Utf8 } from "@/enc/utf8";
import { RC4 } from "@/index";

const mineResult = RC4.encrypt(TestConstant.TEST_STR, TestConstant.TEST_KEY);
console.log(mineResult.toString());
console.log(
  RC4.decrypt(mineResult.toString(), TestConstant.TEST_KEY).toString(Utf8)
);
const otherResult = "U2FsdGVkX1+SrFNcoS6NVrmIxnRgKw7bvShKDKQt1oEcsg==";

console.log(RC4.decrypt(otherResult, TestConstant.TEST_KEY).toString(Utf8));
