import { enc, TripleDES } from "../../lib";
import { TestConstant } from "../constant/test.constant";

const mineResult = TripleDES.encrypt(
  TestConstant.TEST_STR,
  TestConstant.TEST_KEY
);
console.log(mineResult.toString());
console.log(
  TripleDES.decrypt(mineResult.toString(), TestConstant.TEST_KEY).toString(
    enc.Utf8
  )
);

const otherResult = "U2FsdGVkX1+cAEFkvdoUpQl8VcBhMyWrHoik9kaQ4Ss=";

console.log(
  TripleDES.decrypt(otherResult, TestConstant.TEST_KEY).toString(enc.Utf8)
);
