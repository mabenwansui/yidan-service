export interface JwtPayload {
  exp: number
  iat: number
  sub: string
  role: string
  name: string
}
