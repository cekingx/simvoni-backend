import { sign, decode } from 'jsonwebtoken';
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
}

export default JWT;