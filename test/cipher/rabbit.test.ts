import { enc, Rabbit } from "../../lib";
import { TestConstant } from "../constant/test.constant";

const mineResult = Rabbit.encrypt(TestConstant.TEST_STR, TestConstant.TEST_KEY);
console.log(mineResult.toString());
console.log(
  Rabbit.decrypt(mineResult.toString(), TestConstant.TEST_KEY).toString(
    enc.Utf8
  )
);

const trueResult = "U2FsdGVkX1/7nBQTIGZfQmyDXdlPdTcMSMXqcbJRShtbow==";

console.log(
  Rabbit.decrypt(trueResult, TestConstant.TEST_KEY).toString(enc.Utf8)
);
