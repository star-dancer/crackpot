import { WordArray } from "../../src/core/word-array";
import { Base64, Utf8 } from "../../src/enc";
import { TestConstant } from "../constant/test.constant";

const utf8ed: WordArray = Utf8.parse(TestConstant.TEST_STR);
const base64ed = Base64.stringify(utf8ed);
const result = Base64.parse(base64ed);
console.log(utf8ed);
console.log(base64ed);
console.log(result.toString(Utf8));
