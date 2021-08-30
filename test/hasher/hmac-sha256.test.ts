import { HmacSHA256 } from "../../src";
import { TestConstant } from "../constant/test.constant";

const testMine = HmacSHA256(
  TestConstant.TEST_STR,
  TestConstant.TEST_KEY
).toString();

const trueResult =
  "48b18e5cf827c173935367204bc34d3091714c814084858be497ede6d5fc9898";
console.log(testMine);
console.log(trueResult);
if (testMine === trueResult) {
  console.log("success");
}
