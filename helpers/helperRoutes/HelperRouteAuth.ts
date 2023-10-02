import AuthController from '../../app/Controllers/Http/AuthController';

export const login = async (auth, response, request) => {
    const user = new AuthController({ response, request })
    await user.login({ auth, request })
    return user.Login()
}

export const newPassword = async (auth, request, response) => {
    const user = new AuthController({ response, request });
    await user.changePasswordUser({ auth, request })
    return user.changePassword()
}