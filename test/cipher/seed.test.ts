import { enc, SEED } from "../../lib/index.cjs";
import { TestConstant } from "../constant/test.constant";
console.log(enc);
const mineResult = SEED.encrypt(TestConstant.TEST_STR, TestConstant.TEST_KEY);
console.log(mineResult.toString());
console.log(
  SEED.decrypt(mineResult.toString(), TestConstant.TEST_KEY).toString(enc.Utf8)
);
