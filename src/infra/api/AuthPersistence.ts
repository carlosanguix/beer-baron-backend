import jwt from 'jsonwebtoken';
import { Response } from 'express';

class AuthPersistence {

    private readonly OPTS_COOKIE = {
        expires: new Date(Date.now() + 3600000 * 24 * 31),
        secure: process.env.ENVIROMENT === 'production',
        httpOnly: true,
    };

    public setCookie(res: Response, jwt: string) {
        res.cookie('jwt', jwt, this.OPTS_COOKIE);
    }

    public createToken(payload: object) {
        const secretToken = process.env.ACCESS_TOKEN_SECRET; 
        return jwt.sign(payload, secretToken as string, {
            expiresIn: '31d',
        });
    }

    public isValidToken(token: string) {
        const secretToken = process.env.ACCESS_TOKEN_SECRET; 
        return jwt.verify(token,  secretToken as string, (_, decoded) => decoded);
    }

}

export const authPersistence = new AuthPersistence();