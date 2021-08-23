import { SHA3 } from "../src";
import { TestConstant } from "./constant/test.constant";

const testMine = SHA3(TestConstant.TEST_STR).toString();

const trueResult =
  "2a57264bbffe14139f57f8a5220b7dd64ed1da5f72a0fbf83b026f97f26dea20773d3b0dee59d9948e70bcf808ec89908d9de3504766c6f114d72786e6c7d343";
console.log(testMine);
console.log(trueResult);
if (testMine === trueResult) {
  console.log("success");
}
