import { TestConstant } from "test/constant/test.constant";

import { Utf8 } from "@/enc/utf8";

const utf8 = Utf8.parse(TestConstant.TEST_STR);
const result = Utf8.stringify(utf8);
console.log(utf8.toString());
console.log(result);
