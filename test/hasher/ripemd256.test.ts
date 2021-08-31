import { RIPEMD256 } from "../../src";
import { TestConstant } from "../constant/test.constant";

const testMine = RIPEMD256(TestConstant.TEST_STR).toString();

const trueResult =
  "57cc457e8ea3528f62f8741d284d9420e2655898807bcbf28460bb479719dd69";
console.log(testMine);
console.log(trueResult);
if (testMine === trueResult) {
  console.log("success");
}
