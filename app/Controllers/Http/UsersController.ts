import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator';
import User from 'App/Models/User'

export default class UsersController {
    public async index(){
        return User.all();
    };

    public async store({ response, request }: HttpContextContract){
        const newUserSchema = schema.create({
            nick_name: schema.string({ trim: true }),
            email: schema.string({ trim: true }),
            password: schema.string({ trim: true })
        });
        const payload = await request.validate({ schema: newUserSchema });
        const user = await User.create(payload);
        response.status(201);
        return user;
    };

    public async show({ params }: HttpContextContract){
        return User.findOrFail(params.id);
    };

    public async update({ params, request, response }: HttpContextContract){
        const body = request.body();
        const user = await User.findOrFail(params.id);
        if(body.nick_name){
            user.nick_name = body.nick_name;
        };
        if(body.email){
            user.email = body.email;
        };
        if(body.password){
            user.password = body.password;
        };
        await user.save()
        response.status(200).json({ message: 'User Updated Successfully', user })

    };

    public async destroy({ params, response }: HttpContextContract){
        const user = await User.findOrFail(params.id)
        await user.delete()
        response.status(200).json({ message: 'User Deleted Successfully', user })
    }
}
