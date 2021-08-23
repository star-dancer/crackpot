import { RIPEMD160 } from "../src";
import { TestConstant } from "./constant/test.constant";

const testMine = RIPEMD160(TestConstant.TEST_STR).toString();

const trueResult = "7a54fc89d0a923083ab496687e5d8f5451b4a33d";
console.log(testMine);
console.log(trueResult);
if (testMine === trueResult) {
  console.log("success");
}
