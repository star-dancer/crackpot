import { TestConstant } from "test/constant/test.constant";

import { Utf8 } from "@/enc/utf8";
import { SEED } from "@/index";

const mineResult = SEED.encrypt(TestConstant.TEST_STR, TestConstant.TEST_KEY);
console.log(mineResult.toString());
console.log(
  SEED.decrypt(mineResult.toString(), TestConstant.TEST_KEY).toString(Utf8)
);
