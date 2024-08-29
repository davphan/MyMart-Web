import bcrypt from 'bcrypt';

const saltRounds = 10;

export function encryptPassword(password: string) {
  bcrypt.hash(password, saltRounds, function(err: Error | undefined, hash: string) {
    if (err) throw err;

  })
}