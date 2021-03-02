import DatabasePool from "../database/DatabasePool";
import { Connection } from "mysql2/promise";
import Election from "./Election";
import WalletService from "../services/Wallet";

class ElectionDAO {
    private connection: Promise<Connection>
    private walletService: WalletService;

    constructor()
    {
        this.connection = DatabasePool.getConnection();
        this.walletService = new WalletService();
    }

    public getElectionByUserId(userId: number): Promise<Array<Election> | Error>
    {
        let query = `
            select 
                ta_election.election_name               as name,
                ta_election.election_description        as description,
                ref_user.user_username                  as election_authority,
                ref_election_status.election_status     as status,
                ta_election.election_start              as start,
                ta_election.election_end                as end
            from ta_election
            join ref_user 
                on ref_user.user_id=ta_election.election_authority
            join ref_election_status 
                on ref_election_status.election_status_id=ta_election.election_status
            where ref_user.user_id = ?`

        return this.connection
            .then(conn => conn.query(query, userId))
            .then(([rows]: any) => {
                return rows;
            })
            .catch(error => {
                console.log(error);
                return new Error(error);
            });
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

        // set new election status to 1
        // 1 = waiting_approval
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

    public deployElection(eaId: number): Promise<any>
    {
        return this.walletService.unlockAccount('0xa7DE7C83c2Ec1AAe4BC7Abd3D9ba61B7Fa3D1893', 'secret')
            .then(() => {
                this.walletService.sendEther(
                    '0xfE661b28728C663503E00BcaE2DFBbe416EfE5B6',
                    'password',
                    '0xa7DE7C83c2Ec1AAe4BC7Abd3D9ba61B7Fa3D1893',
                    '1000000000000000000'
                )
                .then(data => {
                    console.log(data);
                    return data;
                });
            });

    }
}

export default ElectionDAO;