/**
 * 向数组目标元素的后需插头元素
 * @example
 * ```ts
 * const arr = ['a', 'b', 'c', 'd']
 * const newArr = insertAfter(arr, 'c', 'aa', 'bb')
 * console.log(newArr) // ['a', 'b', 'aa', 'bb', 'c', 'd']
 * ```
 */
export function insertAfter(arr: string[], target: string, ...items: string[]) {
  const index = arr.indexOf(target)
  if (index === -1) {
    return arr
  }
  const _arr = [...arr]
  _arr.splice(index + 1, 0, ...items)
  return _arr
}
