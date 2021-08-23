import { SHA512 } from "../src/algo/sha512.algo";
import { TestConstant } from "./test.constant";

const testMine = SHA512(TestConstant.TEST_STR).toString();

const trueResult =
  "f6f7f0aef79395bf3defb71ff134a80c5bbbc891725ffd1eaaa6013e124c6d2a535ab2ab0ea9e56d583197f84376a5f8ccd48c465f0ff22836e7234a6bfd0af3";
console.log(testMine);
console.log(trueResult);
if (testMine === trueResult) {
  console.log("success");
}
