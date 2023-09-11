import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Hash from "@ioc:Adonis/Core/Hash";
import User from "App/Models/User";

export default class AuthController {
  
  public async login({ auth, request, response }: HttpContextContract) {
    // const { nick_name, email, password } = request.body()
    const nickName = request.input("nick_name");
    const email = request.input("email");
    const password = request.input("password");

    if(nickName) {
      const user = await User.findByOrFail("nick_name", nickName);
      if (!(await Hash.verify(user.password, password))) {
        return response.unauthorized("Invalid credentials");
      }
  
      return await auth.use("api").generate(user);
    } else {
      const user = await User.findByOrFail("email", email);
      if (!(await Hash.verify(user.password, password))) {
        return response.unauthorized("Invalid credentials");
      }
  
      return await auth.use("api").generate(user);
    }
    
  }
}
