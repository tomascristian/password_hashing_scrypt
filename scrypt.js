import { promisify } from "util";
import crypto from "crypto";

export default { hash, compare };

const randomBytes = promisify(crypto.randomBytes);
const scrypt = promisify(crypto.scrypt);

async function hash(password) {
  const salt = await getSalt();
  const hash = await getHash(password, salt);
  const key = encodeKey(hash, salt);
  return key;
}

async function compare(password, key) {
  const { salt, hash } = decodeKey(key);
  const secondHash = await getHash(password, salt);
  return hash === secondHash;
}

async function getSalt(size = 16) {
  return (await randomBytes(size)).toString("base64");
}

async function getHash(password, salt, keylen = 32) {
// https://en.wikipedia.org/wiki/Scrypt#Algorithm
  const options = {
    N: 2 ** 14,
    r: 8,
    p: 1
  };
  return (await scrypt(password, salt, keylen, options)).toString("base64");
}

function encodeKey(hash, salt) {
  return `${salt}:${hash}`;
}

function decodeKey(key) {
  const [salt, hash] = key.split(":");
  return { salt, hash };
}
