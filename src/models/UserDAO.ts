import DatabasePool from "../database/DatabasePool";
import { Connection } from 'mysql2/promise';
import HashPassword from '../libs/HashPassword';
import User from "./User";

class UserDAO {
    private connection: Promise<Connection>;

    constructor()
    {
        this.connection = DatabasePool.getConnection();
    }

    public login(username: string, password: string): Promise<User | Error>
    {
        let query = `
            select 
                ref_user.user_id                as id,
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

                let user: User = {
                    id          : rows[0].id,
                    name        : rows[0].name,
                    username    : rows[0].username,
                    role        : rows[0].role
                }

                this.updateUserLoginAt(user.id);
                return user;
            });
    }

    public createElectionAuthority(electionAuthority: User): Promise<User | Error>
    {
        let query = `
            insert into ref_user
            (user_username, user_password, user_nama, user_user_role_id, user_is_verified)
            values (?, ?, ?, ?, ?)`;

        let password = HashPassword.hash(electionAuthority.password);

        let value = [
            electionAuthority.username,
            password,
            electionAuthority.name,
            2,
            1
        ];

        return this.connection
            .then(conn => conn.query(query, value))
            .then(([rows]: any) => {
                let user: User = {
                    name        : electionAuthority.name,
                    username    : electionAuthority.username,
                    role        : electionAuthority.role
                }
                return user;
            })
            .catch(error => {
                return new Error(error);
            });
    }

    private updateUserLoginAt(user_id: number)
    {
        let query = `
            update ref_user
            set user_login_at=now()
            where ref_user.user_id = ?`;
        let value = user_id;

        return this.connection
            .then(conn => conn.query(query, value))
            .catch(error => {
                console.log('error from updateUserLoginAt');
                console.log(error);
            });
    }
}

export default UserDAO;