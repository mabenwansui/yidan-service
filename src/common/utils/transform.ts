import { TransformFnParams } from 'class-transformer'

/** 
 * 将mongo的_id转换为id 
 * @example
 * ```ts
 * import { Expose, Transform } from 'class-transformer'
 * class Dto {
 *   @Expose()
 *   @Transform(toId)
 *   id: string
 * }
 * ```
 */
export const toId = ({ value, obj }: TransformFnParams): string => value ?? obj._id?.toString()
