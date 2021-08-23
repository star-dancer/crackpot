import { SHA384 } from "../src";
import { TestConstant } from "./constant/test.constant";

const testMine = SHA384(TestConstant.TEST_STR).toString();

const trueResult =
  "c5df6b19d05f32b8e7e42e03d536533ecaa99b65eea70dba718b4412a0022e4d18ce69c3e47f7c08b0a37bcc7088487e";
console.log(testMine);
console.log(trueResult);
if (testMine === trueResult) {
  console.log("success");
}
