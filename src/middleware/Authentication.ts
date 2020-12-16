import { verify } from 'jsonwebtoken';
import { Request, Response } from 'express';
import JSONResponse from '../libs/JSONResponse';
import dotenv from 'dotenv';

class Authentication
{
    static verifyToken(req: Request, res: Response, next: Function)
    {
        dotenv.config();
        let accessTokenSecret = process.env.SECRET;
        let authHeader = req.headers.authorization;

        if(authHeader) {
            let token = authHeader.split(' ')[1];
            let status = verify(token, accessTokenSecret);
            console.log(status);
            next();
        } else {
            console.log('Unauthorized');
            JSONResponse.unauthorized(req, res, 'Unauthorized');
        }
    }
}

export default Authentication;