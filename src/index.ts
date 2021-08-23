import { MD5Algo } from "@/algo/hash/md5.algo";
import { SHA1Algo } from "@/algo/hash/sha1.algo";
import { SHA3Algo } from "@/algo/hash/sha3.algo";
import { Hasher } from "@/core/hasher";

import { SHA224Algo } from "./algo/hash/sha224.algo";
import { SHA256Algo } from "./algo/hash/sha256.algo";
import { SHA384Algo } from "./algo/hash/sha384.algo";
import { SHA512Algo } from "./algo/hash/sha512.algo";

export const MD5 = Hasher._createHelper(MD5Algo);

export const HmacMD5 = Hasher._createHmacHelper(MD5Algo);
export const SHA1 = Hasher._createHelper(SHA1Algo);

export const HmacSHA1 = Hasher._createHmacHelper(SHA1Algo);

export const SHA3 = Hasher._createHelper(SHA3Algo);

export const HmacSHA3 = Hasher._createHmacHelper(SHA3Algo);
export const SHA384 = Hasher._createHelper(SHA384Algo);

export const HmacSHA384 = Hasher._createHmacHelper(SHA384Algo);
export const SHA224 = Hasher._createHelper(SHA224Algo);

export const HmacSHA224 = Hasher._createHmacHelper(SHA224Algo);
export const SHA256 = Hasher._createHelper(SHA256Algo);

export const HmacSHA256 = Hasher._createHmacHelper(SHA256Algo);
export const SHA512 = Hasher._createHelper(SHA512Algo);

export const HmacSHA512 = Hasher._createHmacHelper(SHA512Algo);
