import { Request, Response } from 'express';
import signInUser from '../../../application/useCases/signInUser/signInUser';

class AuthController {

    constructor() {}

    async signUp(req: Request, res: Response) {
        const { name, surname, password, passwordMatch } = req.body;
        console.log({ name, surname, password, passwordMatch });
    }
    
    async signIn(req: Request, res: Response) {
        const { nameOrEmail, password } = req.body;

        try {
            const user = await signInUser(nameOrEmail, password);

            res.status(200).json(user);
        }
        catch(e) {
            console.log(e.message);
            res.status(400).json();
        }
    }

}

export const authController: AuthController = new AuthController();