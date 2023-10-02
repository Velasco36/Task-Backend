import Hash from "@ioc:Adonis/Core/Hash";
import User from "App/Models/User"

export const isLogin = async (auth, request) => {
    const nickName = request.input("nick_name");
    const email = request.input("email");
    const password = request.input("password");

    if(nickName) {
      const user = await User.findByOrFail("nick_name", nickName);
      if (!(await Hash.verify(user.password, password))) {
        return "Invalid credentials";
      }
  
      return await auth.use("api").generate(user);
    } else {
      const user = await User.findByOrFail("email", email);
      if (!(await Hash.verify(user.password, password))) {
        return "Invalid credentials";
      }
  
      return await auth.use("api").generate(user);
    }
}

export const newPasswordUser = async (auth, request) => {
    try {
        const { oldpassword, newpassword } = request.body();
        const user = await auth.use("api").authenticate();
        if(!(await Hash.verify(user.password, oldpassword))) {
            return "Invalid credentials";
        }
        if(newpassword){
            user.password = newpassword
        }
        await user.save();
        return user;
    } catch (error) {
        console.log(error)
    }
}