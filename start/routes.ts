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

import TasksController from "../app/Controllers/Http/TasksController";
import UsersController from "../app/Controllers/Http/UsersController";

Route.post("/login", "AuthController.login");

// Route.resource("/tasks", "TasksController").apiOnly();

Route.get("/tasks", async ({ auth, response }) => {
  const task = new TasksController({ response });
  await task.init({ auth });
  return task.index();
});

// Route.resource("/users", "UsersController").apiOnly();
// Route.get("/user", "UsersController.show");

Route.get("/user", async ({ auth, response }) => {
  const user = new UsersController({ response });
  await user.init({ auth });
  return user.show();
});
