import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class AuthController {
    public async register ({ auth, request, response }: HttpContextContract) {

        const { nick_name, email, password } = request.all()
        console.log({ name: nick_name, email: email, password: password})

        const user = await User.create({
            nick_name,
            email,
            password
        })

        const token = await auth.use('api').attempt(nick_name, email, password)
        response.status(201)
        return {
            user,
            token
        }

    }
}
