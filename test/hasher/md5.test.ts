import { MD5 } from "../../src";
import { TestConstant } from "../constant/test.constant";

const testMine = MD5(TestConstant.TEST_STR).toString();

const trueResult = "c4238f9c93703f673fdb14d99cf4948b";
console.log(testMine);
console.log(trueResult);
if (testMine === trueResult) {
  console.log("success");
}
