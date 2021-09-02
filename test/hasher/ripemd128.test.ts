import { RIPEMD128 } from "../../src";
import { TestConstant } from "../constant/test.constant";

const testMine = RIPEMD128(TestConstant.TEST_STR).toString();

const trueResult = "8af41e10ec96c70741db388666984473";
console.log(testMine);
console.log(trueResult);
if (testMine === trueResult) {
  console.log("success");
}
