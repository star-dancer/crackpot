import { SHA1 } from "../../src";
import { TestConstant } from "../constant/test.constant";

const testMine = SHA1(TestConstant.TEST_STR).toString();

const trueResult = "dfbceb412adbb530ec841223edc488e8a0f8ea59";
console.log(testMine);
console.log(trueResult);
if (testMine === trueResult) {
  console.log("success");
}
