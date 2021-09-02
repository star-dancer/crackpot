import { Utf8 } from "../../src/enc";
import { TestConstant } from "../constant/test.constant";

const utf8 = Utf8.parse(TestConstant.TEST_STR);
const result = Utf8.stringify(utf8);
console.log(utf8.toString());
console.log(result);
