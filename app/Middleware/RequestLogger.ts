import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Logger from '@ioc:Adonis/Core/Logger'

export default class RequestLogger {
  public async handle({ request }: HttpContextContract, next: () => Promise<void>) {
    Logger.info(`[${request.method()}] ${request.url()}`)
    await next()
  }
}
