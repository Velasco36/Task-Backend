// import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { BaseController } from "./BaseController";
import User from "App/Models/User";

export default class UsersController extends BaseController {
  public async index() {
    try {      
      const user = this.auth();
      return this.sendResponse(user);
    } catch (error) {
      return this.sendError(error);
    }
  }

  public async store() {
    try {
      this.postUser
      return this.sendResponse(this.user);
    } catch (error) {
      return this.sendError(error);
    }
  }
  public async show() {
    try {
      return this.sendResponse({ user: this.auth });
    } catch (error) {
      this.sendError(error);
    }
  }

  public async update() {
    try {
      this.putUser
      return this.sendResponse(this.putUser);
    } catch (error) {
      return this.sendError(error);
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
