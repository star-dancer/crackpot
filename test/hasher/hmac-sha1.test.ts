import { HmacSHA1 } from "../../src";
import { TestConstant } from "../constant/test.constant";

const testMine = HmacSHA1(
  TestConstant.TEST_STR,
  TestConstant.TEST_KEY
).toString();

const trueResult = "988ae95f4130c9dde8f3228cab94d0bbbd823653";
console.log(testMine);
console.log(trueResult);
if (testMine === trueResult) {
  console.log("success");
}
