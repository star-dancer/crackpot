import { enc, RabbitLegacy } from "../../lib/index.cjs";
import { TestConstant } from "../constant/test.constant";

const mineResult = RabbitLegacy.encrypt(
  TestConstant.TEST_STR,
  TestConstant.TEST_KEY
);
console.log(mineResult.toString());
console.log(
  RabbitLegacy.decrypt(mineResult.toString(), TestConstant.TEST_KEY).toString(
    enc.Utf8
  )
);
