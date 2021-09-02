import { AES, enc } from "../../lib/index.cjs";
import { TestConstant } from "../constant/test.constant";

const test = AES.encrypt(TestConstant.TEST_STR, TestConstant.TEST_KEY);

const result = test.toString();
const trueResult = "U2FsdGVkX1/BeR8fTgk/JzpYzx1WBsER6unm1KM2sg4=";

const ending = AES.decrypt(result, TestConstant.TEST_KEY).toString(enc.Utf8);
const trueEnding = AES.decrypt(trueResult, TestConstant.TEST_KEY).toString(
  enc.Utf8
);
console.log("result", result);
console.log("ending", ending);
console.log("truelt", trueResult);
console.log("truend", trueEnding);
