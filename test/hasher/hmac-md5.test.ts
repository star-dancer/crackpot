import { HmacMD5 } from "../../src";
import { TestConstant } from "../constant/test.constant";

const testMine = HmacMD5(
  TestConstant.TEST_STR,
  TestConstant.TEST_KEY
).toString();

const trueResult = "59efbe64f6276105980440d9318bbba2";
console.log(testMine);
console.log(trueResult);
if (testMine === trueResult) {
  console.log("success");
}
