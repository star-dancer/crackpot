import { Base64 } from "../../src/enc";
import { TestConstant } from "../constant/test.constant";

const base64 = Base64.parse(TestConstant.TEST_KEY);
const result = Base64.stringify(base64);
console.log(result);
