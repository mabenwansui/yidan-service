const errorPrefix = ''
class Logger {
  error(error: unknown, message?: string) {
    if (error instanceof Error) {
      console.error(`${errorPrefix}${error.message}`, message)
    } else {
      console.error(`${errorPrefix}${error}`, message)
    }
  }
  info(message: string) {
    console.info(message)
  }
}

const logger = new Logger()
export default logger
