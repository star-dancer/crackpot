import { TestConstant } from "test/constant/test.constant";

import { Utf8 } from "@/enc/utf8";
import { RC4Drop } from "@/index";

const mineResult = RC4Drop.encrypt(
  TestConstant.TEST_STR,
  TestConstant.TEST_KEY
);
console.log(mineResult.toString());
console.log(
  RC4Drop.decrypt(mineResult.toString(), TestConstant.TEST_KEY).toString(Utf8)
);
