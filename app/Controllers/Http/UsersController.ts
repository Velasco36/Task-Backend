import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { schema } from "@ioc:Adonis/Core/Validator";
import User from "App/Models/User";

export default class UsersController {
  public async index({ response }: HttpContextContract) {
    try {
      const data = await User.query().preload("tasks");
      const payload = data.map((info) => ({
        user: info.$original,
        tasks: info.$preloaded.tasks
      }))
      const user = payload.map((data) => (
       {
        id: data.user.id,
        nickName: data.user.nick_name,
        email:  data.user.email,
        task: data.tasks
       }
      ))
      return response.status(200).json(user)
    } catch (error) {
      return response.status(404).json({ message: "An error has occurred" });
    }
  }

  public async store({ response, request }: HttpContextContract) {
    try {
      const newUserSchema = schema.create({
        nick_name: schema.string({ trim: true }),
        email: schema.string({ trim: true }),
        password: schema.string({ trim: true }),
      });
      const payload = await request.validate({ schema: newUserSchema });
      const user = await User.create(payload);
      response.status(201);
      return user;
    } catch (error) {
      return response.status(404).json({ message: "An error has occurred" });
    }
  }
  public async show({ params, response }: HttpContextContract) {
    try {
      const user = await User.query()
        .where('id', params.id)
        .preload('tasks')
        // .firstOrFail();

        const responseData = user.map((info)=> ({

          id: info.id,
          nick_name:info.nick_name,
          email: info.email,
          tasks: info.$preloaded.tasks


        }))

      return response.status(200).json(responseData);
    } catch (error) {
      return response.status(404).json({ message: "An error has occurred" });
    }
  }

  public async update({ params, request, response }: HttpContextContract) {
    try {
      const body = request.body();
      const user = await User.findOrFail(params.id);
      if (body.nick_name) {
        user.nick_name = body.nick_name;
      }
      if (body.email) {
        user.email = body.email;
      }
      if (body.password) {
        user.password = body.password;
      }
      await user.save();
      response.status(200).json({ message: "User Updated Successfully", user });
    } catch (error) {
      return response.status(404).json({ message: "An error has occurred" });
    }
  }

  public async destroy({ params, response }: HttpContextContract) {
    try {
      const user = await User.findOrFail(params.id);
      await user.delete();
      response.status(200).json({ message: "User Deleted Successfully", user });
    } catch (error) {
      console.log({ error: error });
      return response.status(404).json({ message: "An error has occurred" });
    }
  }
}
