import { Utf8 } from "@/enc/utf8";

import { AES } from "../src";
import { TestConstant } from "./constant/test.constant";

const test = AES.encrypt(TestConstant.TEST_STR, TestConstant.TEST_KEY);
const result = test.toString();
console.log(result);
const ending = AES.decrypt(result, TestConstant.TEST_KEY).toString(Utf8);
console.log(ending);
