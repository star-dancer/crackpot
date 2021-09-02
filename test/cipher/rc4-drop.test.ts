import { enc, RC4Drop } from "../../lib";
import { TestConstant } from "../constant/test.constant";

const mineResult = RC4Drop.encrypt(
  TestConstant.TEST_STR,
  TestConstant.TEST_KEY
);
console.log(mineResult.toString());
console.log(
  RC4Drop.decrypt(mineResult.toString(), TestConstant.TEST_KEY).toString(
    enc.Utf8
  )
);
