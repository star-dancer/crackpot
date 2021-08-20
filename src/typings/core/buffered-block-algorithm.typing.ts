import { WordArray } from "../../core/word-array";

export interface BufferedBlockAlgorithmConfig {
  blockSize: number;
  iv?: WordArray;
}
