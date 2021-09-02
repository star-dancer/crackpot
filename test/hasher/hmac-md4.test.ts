import { HmacMD4 } from "../../src";
import { TestConstant } from "../constant/test.constant";

const testMine = HmacMD4(
  TestConstant.TEST_STR,
  TestConstant.TEST_KEY
).toString();

const trueResult = "c9f7be1de4ef451fc59457a229c6a9cc";
console.log(testMine);
console.log(trueResult);
if (testMine === trueResult) {
  console.log("success");
}
