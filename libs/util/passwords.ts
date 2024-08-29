import { genSaltSync, hashSync } from "bcrypt-ts";

export function saltAndHash(password: string) {
  const saltRounds = 10;
  return hashSync(password, saltRounds);
}
