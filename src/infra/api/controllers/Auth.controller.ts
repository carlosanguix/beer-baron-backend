import { Request, Response } from 'express';
import signInUser from '../../../application/useCases/signInUser';
import signUpUser from '../../../application/useCases/signUpUser';
import getUserData from '../../../application/useCases/getUserData';
import { authPersistence } from '../AuthPersistence';
import { helpersControllers } from './HelpersControllers'; 

class AuthController {

    public async signUp(req: Request, res: Response) {
        const { username, email, password, repeatPassword } = req.body;
        console.log(this)
        
        try {
            const status = await signUpUser(username, email, password, repeatPassword);
            if (!status) {
                throw new Error('Problems saving the user.');
            }
                
            res.status(200).json({ success: true, msg: 'User registered correctly.' });
        }
        catch(e) {
            res.status(400).json({ 
                error: true,
                msg: e.message,
                ...helpersControllers.errorsMessages[e.message]
            });
        }

    }
    
    public async signIn(req: Request, res: Response) {
        const { nameOrEmail, password } = req.body;

        try {
            const userId = await signInUser(nameOrEmail, password);
            
            const token = authPersistence.createToken({ id: userId });
            authPersistence.setCookie(res, token);
            return res.status(200).json({ success: true });
        }
        catch(e) {
            res.status(400).json({ error: true, msg: e.message });
        }
    }

    public async whoAmI(req: Request, res: Response) {
        try {
            const token = req.cookies.jwt;
            const payload = authPersistence.verifyToken(token);
            if (!token || !payload) {
                throw new Error('No valid token');
            }
            const user = await getUserData(payload.id);
            res.status(200).json({ auth: true, user });
        }
        catch(e) {
            return res.status(401).json({ msg: e.message, auth: false });
        }
    }

}

export const authController: AuthController = new AuthController();