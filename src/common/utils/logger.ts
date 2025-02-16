const errorPrefix = ':::::::::::::::'
class Logger {
  error(error: unknown) {
    if (error instanceof Error) {
      console.error(`${errorPrefix}${error.message}`)
    } else {
      console.error(`${errorPrefix}${error}`)
    }
  }
  info(message: string) {
    console.info(message)
  }
}

const logger = new Logger()
export default logger
