import { HmacRIPEMD256 } from "../../src";
import { TestConstant } from "../constant/test.constant";

const testMine = HmacRIPEMD256(
  TestConstant.TEST_STR,
  TestConstant.TEST_KEY
).toString();

const trueResult =
  "3ad330c7b8e52e8926cb741d5f460eaa4676abc51b53024cb5120b2528f2c138";
console.log(testMine);
console.log(trueResult);
if (testMine === trueResult) {
  console.log("success");
}
