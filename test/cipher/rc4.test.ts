import { enc, RC4 } from "../../lib";
import { TestConstant } from "../constant/test.constant";
const mineResult = RC4.encrypt(TestConstant.TEST_STR, TestConstant.TEST_KEY);
console.log(mineResult.toString());
console.log(
  RC4.decrypt(mineResult.toString(), TestConstant.TEST_KEY).toString(enc.Utf8)
);
const otherResult = "U2FsdGVkX1+SrFNcoS6NVrmIxnRgKw7bvShKDKQt1oEcsg==";

console.log(RC4.decrypt(otherResult, TestConstant.TEST_KEY).toString(enc.Utf8));
