import UsersController from "../../app/Controllers/Http/UsersController";

//Helpers para la rutas de "user"
export const getUser = async (auth, request, response) => {
    const user = new UsersController({ request, response });
    await user.init({ auth });
    return user.show();
}

export const postUser = async (response, request) => {
    const user = new UsersController({ response, request });
    await user.postUser({ request });
    return user.store();
}

export const putUser = async (auth, response, request) => {
    const user = new UsersController({ response, request });
    await user.putUser({ auth, request });
    return user.update();
}

export const deleteUser = async (auth, request, response) => {
    const user = new UsersController({ request, response });
    await user.deleteUser({ auth });
    return user.destroy();
}