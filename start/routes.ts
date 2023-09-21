/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from "@ioc:Adonis/Core/Route";
import { getUser, postUser, putUser, deleteUser } from "../helpers/helperRoutes/HelperRouteUser";
import { getTasks, postTask, putTask, deleteTask } from "../helpers/helperRoutes/HelperRouteTask";


//Ruta del Login

Route.post("/login", "AuthController.login");

// Route.resource("/tasks", "TasksController").apiOnly();
// Route.resource("/users", "UsersController").apiOnly();
// Route.get("/user", "UsersController.show");

//Rutas de las tareas

Route.get("/tasks", async ({ auth, response }) => {
  await getTasks(auth, response)  
});

Route.post("/tasks", async ({ auth, response, request }) => {
  await postTask(auth, response, request)
});

Route.put("/tasks/:id", async ({ auth, params, response, request }) => {
  await putTask(auth, params, response, request)
});

Route.delete("/tasks/:id", async ({ auth, params, response}) => {
  await deleteTask(auth, params, response)
});

//Rutas de usuario

Route.get("/user", async ({ auth, response }) => {
  await getUser(auth, response)
});

Route.post("/user", async ({response, request }) => {
  await postUser(response, request)
});

Route.put("/user", async ({auth, response, request }) => {
  await putUser(auth, response, request)
});

Route.delete("/user", async ({ auth, response }) => {
  await deleteUser(auth, response)
});