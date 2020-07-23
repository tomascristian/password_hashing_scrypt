import test from "tddf";
import scrypt from "./scrypt.js";

const { hash, compare } = scrypt;

test("Can compare a password to a hash", async t => {
  const password = "1234";
  const hash1 = await hash(password);
  t.assert(await compare(password, hash1));
});

test("Hashes are always unique (thanks to salting)", async t => {
  const password = "1234";
  const hash1 = await hash(password);
  const hash2 = await hash(password);
  t.assert(hash1 !== hash2);
});
