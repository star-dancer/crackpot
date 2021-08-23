import { HmacSHA512 } from "../src";
import { TestConstant } from "./constant/test.constant";

const testMine = HmacSHA512(
  TestConstant.TEST_STR,
  TestConstant.TEST_KEY
).toString();

const trueResult =
  "4bf315d1c2601c441f06c09a8f7f04036201b65defab1763092f70e3e64444124ff2da4a54205b0c1ea6807e7a5af31f30b88d85531d5c6f8f538e0a27328cbf";
console.log(testMine);
console.log(trueResult);
if (testMine === trueResult) {
  console.log("success");
}
