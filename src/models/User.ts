import Database from '../database/Database';
import { Connection } from 'mysql';
import HashPassword from '../libs/HashPassword';

/**
 * ref_user
 * - user_id INT AUTO_INCREMENT
 * - user_username VARCHAR
 * - user_password VARCHAR
 * - user_nama VARCHAR
 * - user_wallet_address VARCHAR
 * - user_user_role_id INT
 */

class User {
    private _connection: Connection;

    constructor()
    {
        this._connection = Database.makeConnection();
    }

    public getAll(callback: Function)
    {
        let query = 'SELECT * FROM ref_user';
        this._connection.query(query, (err, rows) => {
            if(err) throw err;

            console.log('Data received from DB');
            console.log(rows);
            callback(rows);
        });
    }

    public getById(id: String, callback: Function)
    {
        let query = 'SELECT * FROM ref_user WHERE user_id = ?';
        let value = id
        this._connection.query(query, value, (err, rows) => {
            if(err) throw err;

            console.log('Data received from DB');
            console.log(rows);
            callback(rows);
        });
    }

    public createUser(data:any)
    {
        let password = data.user_password;
        password = HashPassword.hash(password);

        let user:any = {
            user_username       : data.user_username,
            user_password       : password,
            user_nama           : data.user_nama,
            user_wallet_address : data.user_wallet_address,
            user_user_role_id   : data.user_user_role_id
        }

        let query = 'INSERT INTO ref_user SET ?';
        this._connection.query(query, user, (err, result) => {
            if(err) throw err;

            console.log(result);
            console.log('Oke');
        });
    }

    public updateUser(data:any, id: String)
    {
        let user:any = {
            user_username       : data.user_username,
            user_password       : data.user_password,
            user_nama           : data.user_nama,
            user_wallet_address : data.user_wallet_address,
            user_user_role_id   : data.user_user_role_id
        }

        let query = 'UPDATE ref_user SET ? WHERE user_id = ?';
        let value = [user, id];
        this._connection.query(query, value, (err, result, field) => {
            if(err) throw err;

            console.log(result);
            console.log('Updated');
            return result;
        });
    }

    public deleteUser(id: String)
    {
        let query = 'DELETE from ref_user WHERE user_id = ?';
        let value = id;
        this._connection.query(query, value, (err, result, field) => {
            if(err) throw err;

            console.log(result);
            console.log('Deleted');
            return result;
        })
    }

    public login(data: any, callback: Function)
    {
        let { username, password } = data;
        let query = 'SELECT * FROM ref_user WHERE user_username = ?';
        let value = username;
        this._connection.query(query, value, (err, result) => {
            if(err) throw err;

            let isValidPassword     = HashPassword.compare(password, result[0].user_password);
            let userRole            = result[0].user_user_role_id;

            callback(isValidPassword, userRole);
        })
    }
}

export default User;