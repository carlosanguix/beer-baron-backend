import { Request, Response } from 'express';
import signInUser from '../../../application/useCases/signInUser/signInUser';
import signUpUser from '../../../application/useCases/singUpUser/signUpUser';

class AuthController {

    constructor() {}

    async signUp(req: Request, res: Response) {
        const { name, surname, email, password, passwordMatch } = req.body;
        
        try {
            const status = await signUpUser(name, surname, email, password, passwordMatch);
            res.status(400).json({ msg: status ? 'User registered correctly' : 'Problems Registering the user.' });
        }
        catch(e) {
            console.log(e.message);
        }

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