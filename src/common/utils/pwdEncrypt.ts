import * as bcrypt from 'bcrypt'

const saltRounds = 10

export async function pwdEncrypt(pwd: string): Promise<string> {
  return new Promise((resolve, reject) => {
    bcrypt.hash(pwd, saltRounds, function (err, hash) {
      if (err) {
        reject(err)
      } else {
        resolve(hash)
      }
    })
  })
}

export async function pwdCompare(pwd: string, hash: string): Promise<boolean> {
  return new Promise((resolve) => {
    bcrypt.compare(pwd, hash, (result) => resolve(result))
  })
}
