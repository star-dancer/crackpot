import { BlockCipherMode } from "./BlockCipherMode";
import { CBCDecryptor } from "./CBCDecryptor";
import { CBCEncryptor } from "./CBCEncryptor";

/**
 * Cipher Block Chaining mode.
 */
export abstract class CBC extends BlockCipherMode {
  public static Encryptor: unknown = CBCEncryptor;

  public static Decryptor: unknown = CBCDecryptor;
}
