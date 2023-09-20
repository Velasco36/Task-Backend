import UserValidator from "../../app/Validators/UserValidator";
import User from "App/Models/User"

export const createNewUser = async (request) => {
    try {
        const payload = await request.validate({ schema: UserValidator.newUserSchema });
        const user = await User.create(payload);
        return user
      } catch (error) {
        console.log(error)
      }
}

export const updateUser = async (auth, request, params) => {
    try {
        await auth.use("api").authenticate();
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
        return user
      } catch (error) {
        console.log(error)
      }
}