import UserValidator from "../../app/Validators/UserValidator";
import User from "App/Models/User"
import Mail from '@ioc:Adonis/Addons/Mail'

export const createNewUser = async (request) => {
    try {
        const payload = await request.validate({ schema: UserValidator.newUserSchema });
        const user = await User.create(payload);
        Mail.send((message) => {
            message
              .from('verify@adonisgram.com')
              .to(user.email)
              .subject('Welcome Onboard!')
              .htmlView(`<h1>bienvenido ${user.nick_name} <h1>`)
          })
        return user
      } catch (error) {
        console.log(error)
      }
}

export const updateUser = async (auth, request) => {
    try {
        const data = await auth.use("api").authenticate();
        const body = request.body();
        const id = data.$original.id;
        const user = await User.findOrFail(id);
        if (body.nick_name) {
            user.nick_name = body.nick_name;
        }
        if (body.email) {
            user.email = body.email;
        }
        await user.save();
        return user;
      } catch (error) {
        console.log(error);
      }
}

export const destroyUser = async (auth) => {
    try {
        const data = await auth.use("api").authenticate();
        const id = data.$original.id
        const user = await User.findOrFail(id);
        await user.delete();
        return user
    } catch (error) {
        console.log(error)
    }
}
