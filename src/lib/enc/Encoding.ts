import { WordArray } from "../WordArray";

export interface Encoding {
  stringify: (wordArray: WordArray) => string;

  parse: (str: string) => WordArray;
}
