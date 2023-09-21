// import { ResponseContract } from "@ioc:Adonis/Core/Response";
import TaskValidator from "App/Validators/TaskValidator";
import Task from "App/Models/Task";

export const createNewTask = async (auth, request) => {
    try {
        const user = await auth.use('api').authenticate();
        const id = user.$attributes.id
        const payload = await request.validate({ schema: TaskValidator.newTaskShema });
        const create = {
          userId: `${id}`,
          ...payload
        }
        const task = await Task.create(create);
        return task
      } catch (error) {
        console.log(error)
      }
}

export const updateTask = async (auth, request, params) => {
  try {
    // console.log(request)
    await auth.use("api").authenticate();
    const body = request.body();
    const task = await Task.findOrFail(params.id);
      if (body.name) {
        task.name = body.name;
      }
      if (body.description) {
        task.description = body.description;
      }
      if (body.state) {
        task.state = body.state;
      }
      if (body.color) {
        task.color = body.color;
      }
      if (body.limitAt) {
        task.limitAt = body.limitAt;
      }
      return task.save();
  } catch (error) {
    console.log(error)
  }
}

export const destroyTask = async (auth, params) => {
  try {
      await auth.use("api").authenticate()
      const task = await Task.findOrFail(params.id);
      await task.delete();
      return task
  } catch (error) {
    console.log(error)
  }
}