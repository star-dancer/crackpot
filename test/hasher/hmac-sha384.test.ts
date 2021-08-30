import { HmacSHA384 } from "../../src";
import { TestConstant } from "../constant/test.constant";

const testMine = HmacSHA384(
  TestConstant.TEST_STR,
  TestConstant.TEST_KEY
).toString();

const trueResult =
  "51aba20859920413097a741c4a840c0f3a5e9878edd0430d894e1c7c00cd89b5352aaa6644539f9597b133ac379f72e9";
console.log(testMine);
console.log(trueResult);
if (testMine === trueResult) {
  console.log("success");
}
