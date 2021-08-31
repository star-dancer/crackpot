import { TestConstant } from "test/constant/test.constant";

import { PBKDF2 } from "@/index";

const testMine = PBKDF2(TestConstant.TEST_STR, TestConstant.TEST_KEY, {
  iterations: 100
}).toString();

const trueResult = "dfdeba31dd8bad7b2ce78e59f0ecc853";
console.log(testMine);
console.log(trueResult);
if (testMine === trueResult) {
  console.log("success");
}
