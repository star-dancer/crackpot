import { enc, SEED } from "../../lib";
import { TestConstant } from "../constant/test.constant";

const mineResult = SEED.encrypt(TestConstant.TEST_STR, TestConstant.TEST_KEY);
console.log(mineResult.toString());
console.log(
  SEED.decrypt(mineResult.toString(), TestConstant.TEST_KEY).toString(enc.Utf8)
);
