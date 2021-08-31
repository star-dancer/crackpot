import { AESAlgo } from "@/algo/crypto/aes.algo";
import { DESAlgo, TripleDESAlgo } from "@/algo/crypto/tripledes.algo";
import { MD5Algo } from "@/algo/hash/md5.algo";
import { PBKDF2 } from "@/algo/hash/pbkdf2.algo";
import { RIPEMD160Algo } from "@/algo/hash/ripemd160.algo";
import { SHA1Algo } from "@/algo/hash/sha1.algo";
import { SHA3Algo } from "@/algo/hash/sha3.algo";
import { SHA224Algo } from "@/algo/hash/sha224.algo";
import { SHA256Algo } from "@/algo/hash/sha256.algo";
import { SHA384Algo } from "@/algo/hash/sha384.algo";
import { SHA512Algo } from "@/algo/hash/sha512.algo";
import { BlockCipher } from "@/core/cipher/block-cipher";
import { Hasher } from "@/core/hash/hasher";

import { RabbitAlgo } from "./algo/crypto/rabbit.algo";
import { RC4Algo } from "./algo/crypto/rc4.algo";
import { StreamCipher } from "./core/cipher/stream-cipher";

const MD5 = Hasher._createHelper(MD5Algo);
const HmacMD5 = Hasher._createHmacHelper(MD5Algo);
const SHA1 = Hasher._createHelper(SHA1Algo);
const HmacSHA1 = Hasher._createHmacHelper(SHA1Algo);
const SHA3 = Hasher._createHelper(SHA3Algo);
const HmacSHA3 = Hasher._createHmacHelper(SHA3Algo);
const SHA384 = Hasher._createHelper(SHA384Algo);
const HmacSHA384 = Hasher._createHmacHelper(SHA384Algo);
const SHA224 = Hasher._createHelper(SHA224Algo);
const HmacSHA224 = Hasher._createHmacHelper(SHA224Algo);
const SHA256 = Hasher._createHelper(SHA256Algo);
const HmacSHA256 = Hasher._createHmacHelper(SHA256Algo);
const SHA512 = Hasher._createHelper(SHA512Algo);
const HmacSHA512 = Hasher._createHmacHelper(SHA512Algo);
const RIPEMD160 = Hasher._createHelper(RIPEMD160Algo);
const HmacRIPEMD160 = Hasher._createHmacHelper(RIPEMD160Algo);

const AES = BlockCipher._createHelper(AESAlgo);
const DES = BlockCipher._createHelper(DESAlgo);
const TripleDES = BlockCipher._createHelper(TripleDESAlgo);
const RC4 = StreamCipher._createHelper(RC4Algo);
const Rabbit = StreamCipher._createHelper(RabbitAlgo);

export {
  AES,
  DES,
  HmacMD5,
  HmacRIPEMD160,
  HmacSHA1,
  HmacSHA3,
  HmacSHA224,
  HmacSHA256,
  HmacSHA384,
  HmacSHA512,
  MD5,
  PBKDF2,
  Rabbit,
  RC4,
  RIPEMD160,
  SHA1,
  SHA3,
  SHA224,
  SHA256,
  SHA384,
  SHA512,
  TripleDES
};
