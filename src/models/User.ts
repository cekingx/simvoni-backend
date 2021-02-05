import DatabasePool from "../database/DatabasePool";
import { Connection } from 'mysql2/promise';
import HashPassword from '../libs/HashPassword';

class User {
    private connection: Promise<Connection>;

    constructor()
    {
        this.connection = DatabasePool.getConnection();
    }

    public login(username: string, password: string)
    {
        let query = `
            select 
                ref_user.user_username          as username,
                ref_user.user_password          as password,
                ref_user.user_nama              as name,
                ref_user_role.user_role_name    as role
            from ref_user 
            join ref_user_role on user_role_id = ref_user.user_user_role_id 
            where ref_user.user_username = ?`;

        let value = username;
        return this.connection
            .then(conn => conn.query(query, value))
            .then(([rows]: any) => {
                if(rows.length == 0) {
                    return new Error('Username tidak ditemukan');
                }

                let isValidPassword = HashPassword.compare(password, rows[0].password);

                if(!isValidPassword) {
                    return new Error('Password salah');
                }

                return {
                    status      : isValidPassword, 
                    role        : rows[0].role,
                    username    : rows[0].username,
                    name        : rows[0].name
                }
            });
    }
}

export default User;