import { TestConstant } from "test/constant/test.constant";

import { Utf8 } from "@/enc/utf8";
import { Rabbit } from "@/index";

const mineResult = Rabbit.encrypt(TestConstant.TEST_STR, TestConstant.TEST_KEY);
console.log(mineResult.toString());
console.log(
  Rabbit.decrypt(mineResult.toString(), TestConstant.TEST_KEY).toString(Utf8)
);

const trueResult = "U2FsdGVkX1/7nBQTIGZfQmyDXdlPdTcMSMXqcbJRShtbow==";

console.log(Rabbit.decrypt(trueResult, TestConstant.TEST_KEY).toString(Utf8));
