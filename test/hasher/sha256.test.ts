import { SHA256 } from "../../src";
import { TestConstant } from "../constant/test.constant";

const testMine = SHA256(TestConstant.TEST_STR).toString();

const trueResult =
  "7df35c4b22360fe1b9e9ff3d17eda71d2b5a0a0625fc722edc1a694badfdee5d";
console.log(testMine);
console.log(trueResult);
if (testMine === trueResult) {
  console.log("success");
}
