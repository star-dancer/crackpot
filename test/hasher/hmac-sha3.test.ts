import { HmacSHA3 } from "../../src";
import { TestConstant } from "../constant/test.constant";

const testMine = HmacSHA3(
  TestConstant.TEST_STR,
  TestConstant.TEST_KEY
).toString();

const trueResult =
  "c9db2e3ff3dd2a33e7336e43c297bd54748371048449177c6783999a54a5e3b12ef0f61aaab8cf32930840efc24e1cb421ca41807c62d0b0b31c3421063c3e0a";
console.log(testMine);
console.log(trueResult);
if (testMine === trueResult) {
  console.log("success");
}
