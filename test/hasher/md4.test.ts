import { MD4 } from "../../src";
import { TestConstant } from "../constant/test.constant";

const testMine = MD4(TestConstant.TEST_STR).toString();

const trueResult = "6f6d527cfb09a065252632101c8ebd0b";
console.log(testMine);
console.log(trueResult);
if (testMine === trueResult) {
  console.log("success");
}
