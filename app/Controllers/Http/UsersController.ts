// import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { BaseController } from "./BaseController";

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
      return this.sendResponse(this.user);
    } catch (error) {
      return this.sendError(error);
    }
  }

  public async destroy() {
    try {
      this.deleteUser
      return this.sendResponse(this.user);
    } catch (error) {
      return this.sendError(error);
    }
  }
}
