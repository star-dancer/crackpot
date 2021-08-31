import { RIPEMD320 } from "../../src";
import { TestConstant } from "../constant/test.constant";

const testMine = RIPEMD320(TestConstant.TEST_STR).toString();

const trueResult =
  "1f45bc8bf8d82837ffd88b8eb5844c1794b0aaac07a476c0154e925820bebca8e25f87420301d67d";
console.log(testMine);
console.log(trueResult);
if (testMine === trueResult) {
  console.log("success");
}
