import { HmacSHA224 } from "../src";
import { TestConstant } from "./constant/test.constant";

const testMine = HmacSHA224(
  TestConstant.TEST_STR,
  TestConstant.TEST_KEY
).toString();

const trueResult = "8c22c78062bd801570349570f2e4937e83c943eb6f88ecef34882d15";
console.log(testMine);
console.log(trueResult);
if (testMine === trueResult) {
  console.log("success");
}
