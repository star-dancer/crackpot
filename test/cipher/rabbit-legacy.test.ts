import { TestConstant } from "test/constant/test.constant";

import { Utf8 } from "@/enc/utf8";
import { RabbitLegacy } from "@/index";

const mineResult = RabbitLegacy.encrypt(
  TestConstant.TEST_STR,
  TestConstant.TEST_KEY
);
console.log(mineResult.toString());
console.log(
  RabbitLegacy.decrypt(mineResult.toString(), TestConstant.TEST_KEY).toString(
    Utf8
  )
);
