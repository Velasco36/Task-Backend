import { ResponseContract } from "@ioc:Adonis/Core/Response";
import { AuthContract } from "@ioc:Adonis/Addons/Auth";
import User from "App/Models/User";

export class BaseController {
  protected auth: AuthContract | User | any;
  protected response: ResponseContract;

  constructor({ response }: { response: ResponseContract }) {
    this.response = response;
  }

  async init({ auth }: { auth: AuthContract }) {
    try {
      this.auth = await auth.use("api").authenticate();
    } catch (error) {
      console.error(error);
    }
  }

  protected sendResponse(
    result: object | string | null = null,
    message: string | any = null,
    status: number = 200
  ) {
    return this.response.status(status).json({
      success: true,
      data: result,
      msg: message ? message : "ok",
    });
  }

  protected sendError(e: object | any | null, message: string | null = null) {
    if (message) {
      return this.response.status(400).json({
        success: false,
        msg: message,
      });
    }

    if (e.messages) {
      return this.response.status(400).json({
        msg: "Error de validación",
        error: e.messages?.errors[0] || e.messages,
      });
    }

    if (e.message) {
      return this.response.status(400).json({
        success: false,
        error: e.message,
      });
    }

    return this.response.status(400).json({
      success: false,
      error: e,
    });
  }
}
