import { TestConstant } from "test/constant/test.constant";

import { WordArray } from "@/core/word-array";
import { Base64 } from "@/enc/base64";
import { Utf8 } from "@/enc/utf8";

const utf8ed: WordArray = Utf8.parse(TestConstant.TEST_STR);
const base64ed = Base64.stringify(utf8ed);
const result = Base64.parse(base64ed);
console.log(utf8ed);
console.log(base64ed);
console.log(result.toString(Utf8));
