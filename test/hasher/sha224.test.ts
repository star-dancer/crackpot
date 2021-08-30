import { SHA224 } from "../../src";
import { TestConstant } from "../constant/test.constant";

const testMine = SHA224(TestConstant.TEST_STR).toString();

const trueResult = "4d8ba693aa148506c4950d869653f75ab399a8bec883fcf941d0095d";
console.log(testMine);
console.log(trueResult);
if (testMine === trueResult) {
  console.log("success");
}
