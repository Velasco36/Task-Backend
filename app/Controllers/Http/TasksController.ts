import { BaseController } from "./BaseController";

export default class TasksController extends BaseController {
  public async index() {
    try {
      await this.auth?.load("tasks");
      return this.sendResponse({ tasks: this.auth.tasks });
    } catch (error) {
      this.sendError(error);
    }
  }
  
  public async store() {
    try {
      await this.postTask
      return this.sendResponse(this.task)
    } catch (error) {
      return this.sendError(error)
    }
  }

  public async update() {
    try {
      await this.putTask
      return this.sendResponse(this.task)
    } catch (error) {
      return this.sendError(error)
    }
  }

  public async destroy() {
    try {
      await this.deleteTask
      return this.sendResponse(this.task)
    } catch (error) {
      return this.sendError(error)
    }
  }
}
