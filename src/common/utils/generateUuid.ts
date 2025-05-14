import { customAlphabet } from 'nanoid'

const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'

export function generateUuid(length = 16) {
  return customAlphabet(alphabet, length)()
}

export function generateOrderId() {
  const randomNum = Math.floor(Math.random() * 9) + 1;
  return randomNum + customAlphabet(`0123456789`, 15)()
}