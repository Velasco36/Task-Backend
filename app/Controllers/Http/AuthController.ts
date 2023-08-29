import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Hash from "@ioc:Adonis/Core/Hash";
import User from "App/Models/User";

export default class AuthController {
  public async register({ auth, request, response }: HttpContextContract) {
    const { nick_name, email, password } = request.all();
    console.log({ name: nick_name, email: email, password: password });

    const user = await User.create({
      nick_name,
      email,
      password,
    });

    const token = await auth.use("api").attempt(nick_name, email);

    response.status(201);
    return {
      user,
      token,
    };
  }

  public async login({ auth, request, response }: HttpContextContract) {
    const nickName = request.input("nick_name");
    const password = request.input("password");

    const user = await User.findByOrFail("nick_name", nickName);

    if (!(await Hash.verify(user.password, password))) {
      return response.unauthorized("Invalid credentials");
    }

    return await auth.use("api").generate(user);
  }
}
