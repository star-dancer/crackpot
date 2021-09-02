import { HmacRIPEMD128 } from "../../src";
import { TestConstant } from "../constant/test.constant";

const testMine = HmacRIPEMD128(
  TestConstant.TEST_STR,
  TestConstant.TEST_KEY
).toString();

const trueResult = "393125a382198f2c761501f5c5d4304d";
console.log(testMine);
console.log(trueResult);
if (testMine === trueResult) {
  console.log("success");
}
