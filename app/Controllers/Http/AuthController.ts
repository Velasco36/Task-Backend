import { BaseController } from './BaseController';

export default class AuthController extends BaseController {
  
  public async Login() {
    try {
      this.login
      return this.sendResponse(this.user);
    } catch (error) {
      return this.sendError(error);
    }
    
    
  }

  public async changePassword() {
    try {
      this.changePasswordUser
      return this.sendResponse(this.user);
    } catch (error) {
      return this.sendError(error);
    }
  }
}
