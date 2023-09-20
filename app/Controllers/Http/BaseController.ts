import { ResponseContract } from "@ioc:Adonis/Core/Response";
import { RequestContract } from "@ioc:Adonis/Core/Request";
import { AuthContract } from "@ioc:Adonis/Addons/Auth";
import User from "App/Models/User";
import { createNewTask, destroyTask, updateTask } from "../../../helpers/helpersControllers/HelperTask"
import { createNewUser, updateUser } from "../../../helpers/helpersControllers/HelperUser"

export class BaseController {
  protected auth: AuthContract | User | any;
  protected user: {} | any;
  protected response: ResponseContract;
  protected request: RequestContract;
  protected params: Record<string, any>;
  protected task: {} | any ; 

  constructor({ response, request }: { response: ResponseContract, request: RequestContract }, ) {
    this.response = response;
    this.request = request;
  }
  
  protected async init({ auth }: { auth: AuthContract }) {
    try {
      this.auth = await auth.use("api").authenticate();
    } catch (error) {
      console.error(error);
    }
  }

  protected async postUser({request }: { request: RequestContract }){
    this.user = await createNewUser(request)
  }

  protected async putUser(
    { auth, 
      request,
      params 
    }: { 
      auth: AuthContract, 
      request: RequestContract,
      params: Record<string, any>}
  ){
    this.task = await updateUser(auth, request, params)
  }

  protected async postTask({ auth, request }: { auth: AuthContract, request: RequestContract }){
    this.task = await createNewTask(auth, request)
  }

  protected async putTask(
    { auth, 
      request,
      params 
    }: { 
      auth: AuthContract, 
      request: RequestContract,
      params: Record<string, any>}
    ){
    this.task = await updateTask(auth, request, params)
  }

  protected async deleteTask({ auth, params}: {auth: AuthContract, params: Record<string, any>}){
    this.task = await destroyTask(auth, params)
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
