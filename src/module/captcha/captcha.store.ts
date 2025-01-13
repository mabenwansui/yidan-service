class CaptchaStore {
  private captchas: Map<string, string> = new Map()
  private timerKeys: Map<string, NodeJS.Timeout> = new Map()
  set(key: string, value: string, expireTime: number = 2 * 60e3) {
    const timer = setTimeout(() => {
      this.timerKeys.delete(key)
      this.captchas.delete(key)
    }, expireTime)
    this.timerKeys.set(key, timer)
    return this.captchas.set(key, value)
  }
  get(key: string) {
    return this.captchas.get(key)
  }
  delete(key: string) {
    clearTimeout(this.timerKeys.get(key))
    this.timerKeys.delete(key)
    return this.captchas.delete(key)
  }
}
export default new CaptchaStore()
