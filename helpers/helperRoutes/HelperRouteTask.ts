import TasksController from "../../app/Controllers/Http/TasksController";

//Helpers para la rutas de "tasks"
export const getTasks = async (auth, request, response) => {
    const task = new TasksController({ request, response });
    await task.init({auth});
    return task.index()    
}

export const postTask = async (auth, response, request) => {
    const task = new TasksController({ response, request });
    await task.postTask({ auth, request });
    return task.store();
}

export const putTask = async (auth, params, response, request) => {
    const task = new TasksController({ response, request });
    await task.putTask({ auth, params, request });
    return task.update();
}

export const deleteTask = async (auth, params, request, response) => {
    const task = new TasksController({ request, response });
    await task.deleteTask({ auth, params });
    return task.destroy();
}
