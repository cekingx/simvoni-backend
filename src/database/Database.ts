import { createConnection, Connection } from 'mysql';
import dotenv from 'dotenv';

class Database
{
    static connection: Connection;

    static makeConnection()
    {
        dotenv.config();

        this.connection = createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME
        });

        return this.connection;
    }
}

export default Database;