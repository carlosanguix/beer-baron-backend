import { Router } from 'express';
import IRoutes from './Iroutes';
import { authController } from '../controllers/Auth.controller'

class AuthRoutes implements IRoutes {
    router: Router;

    constructor() {
        this.router = Router();
        this.initRoutes();
    }

    initRoutes() {
        this.router.post('/signin', authController.signIn);
        this.router.post('/signup', authController.signUp);
        this.router.get('/whoAmI',  authController.whoAmI);
    }

}

const authRoutes: AuthRoutes = new AuthRoutes();
export default authRoutes.router;