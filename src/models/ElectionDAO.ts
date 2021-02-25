import DatabasePool from "../database/DatabasePool";
import { Connection } from "mysql2/promise";
import Election from "./Election";

class ElectionDAO {
    private connection: Promise<Connection>

    constructor()
    {
        this.connection = DatabasePool.getConnection();
    }

    public createElection(election: Election): Promise<Election | Error>
    {
        let query = `
            insert into ta_election
            (
                election_name, 
                election_description, 
                election_authority, 
                election_status, 
                election_start, 
                election_end
            )
            values (?, ?, ?, ?, ?, ?);`

        let value =     
        [
            election.name,
            election.description,
            election.election_authority,
            1,
            election.start,
            election.end
        ];


        return this.connection
            .then(conn => conn.query(query, value))
            .then(([rows]: any) => {
                let electionResult: Election = {
                    name                : election.name,
                    description         : election.description,
                    election_authority  : election.election_authority,
                    status              : election.status,
                    start               : election.start,
                    end                 : election.end
                }

                return electionResult;
            })
            .catch(error => {
                console.log(error);
                return new Error(error);
            });
    }

    public getEaId(ea_username: string): Promise<number>
    {
        let query = `
            select user_id
            from ref_user
            where ref_user.user_username = ?`;

        return this.connection
            .then(conn => conn.query(query, ea_username))
            .then(([rows]: any) => {
                return rows[0].user_id
            });
    }
}

export default ElectionDAO;