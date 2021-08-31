import { HmacRIPEMD160 } from "../../src";
import { TestConstant } from "../constant/test.constant";

const testMine = HmacRIPEMD160(
  TestConstant.TEST_STR,
  TestConstant.TEST_KEY
).toString();

const trueResult = "cdb3da763b7364827d1271b442329ac726ed41c9";
console.log(testMine);
console.log(trueResult);
if (testMine === trueResult) {
  console.log("success");
}
