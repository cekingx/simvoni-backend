import { sign, decode } from 'jsonwebtoken';
import jwt_decode from "jwt-decode";
import dotenv from 'dotenv';

class JWT
{
    static makeToken(username: String, role: String)
    {
        dotenv.config();
        let accessTokenSecret = process.env.SECRET;

        return sign(
            {username: username, role: role}, 
            accessTokenSecret, 
            {expiresIn: '1d'}
        );
    }

    static isAdmin(token: string)
    {
        return decode(token);
    }

    static getPayload(token: string)
    {
        return jwt_decode(token);
    }
}

export default JWT;