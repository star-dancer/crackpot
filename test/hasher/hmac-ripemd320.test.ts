import { HmacRIPEMD320 } from "../../src";
import { TestConstant } from "../constant/test.constant";

const testMine = HmacRIPEMD320(
  TestConstant.TEST_STR,
  TestConstant.TEST_KEY
).toString();

const trueResult =
  "f30b4b4e6fb8006413d952a2dfa90269ef90472cb011ef6ffc9117b865e990f332c594726d24a100";
console.log(testMine);
console.log(trueResult);
if (testMine === trueResult) {
  console.log("success");
}
