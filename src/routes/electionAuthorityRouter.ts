import express from 'express';
import User from "../models/User";
import UserDAO from '../models/UserDAO';
import Election from "../models/Election";
import ElectionDAO from "../models/ElectionDAO";
import JSONResponse from '../libs/JSONResponse';
import JWT from '../libs/JWT';
import ElectionService from "../services/ElectionService";
const electionAuthorityRouter = express.Router();

let user            = new UserDAO();
let election        = new ElectionDAO();
let electionService = new ElectionService();

electionAuthorityRouter.get('/election', (req, res) => {
    try {
        let payload: any = JWT.getPayloadFronHeader(req.headers.authorization);
        let username = payload.username;

        election.getEaId(username)
            .then((ea_id: number) => {
                election.getElectionByUserId(ea_id)
                    .then((elections: Array<Election> | Error) => {
                        if(elections instanceof Error) {
                            console.log(false);
                            JSONResponse.badRequest(req, res, null);
                            return;
                        }

                        JSONResponse.success(req, res, 'Success', elections);
                    })
            });
    } catch (error) {
        console.log(error.message, error.stack);
        JSONResponse.serverError(req, res, null);
    }
});

electionAuthorityRouter.post('/election', (req, res) => {
    try {
        let payload: any    = JWT.getPayloadFronHeader(req.headers.authorization);
        let username        = payload.username;

        election.getEaId(username)
            .then((ea_id: number) => {
                let newElection: Election = {
                    name                : req.body.name,
                    description         : req.body.description,
                    election_authority  : ea_id,
                    start               : req.body.start,
                    end                 : req.body.end
                }

                return newElection;
            })
            .then((newElection: Election) => {
                election.createElection(newElection)
                    .then((createdElection: Election | Error) => {
                        if(createdElection instanceof Error) {
                            console.log(false);
                            JSONResponse.badRequest(req, res, null);
                            return;
                        }

                        JSONResponse.created(req, res, null, createdElection);
                    })
            })

    } catch (error) {
        console.log(error.message, error.stack);
        JSONResponse.serverError(req, res, null);
    }
})

electionAuthorityRouter.get('/election/:electionId', (req, res) => {
    try {
        let electionId: number = Number(req.params.electionId);

        election.getElectionById(electionId)
            .then((election: Election | Error) => {
                if(election instanceof Error) {
                    console.log(false);
                    JSONResponse.badRequest(req, res, null);
                    return;
                }

                JSONResponse.success(req, res, 'Success', election);
            });
    } catch (error) {
        console.log(error.message, error.stack);
        JSONResponse.serverError(req, res, null);
    }
})

electionAuthorityRouter.post('/set-wallet-address', (req, res) => {
    try {
        let payload: any    = JWT.getPayloadFronHeader(req.headers.authorization);
        let username        = payload.username;

        user.setWalletAddress(username)
            .then((wallet_address: string | Error) => {
                console.log(wallet_address);
                JSONResponse.success(req, res, null, wallet_address);
            })
            .catch(error => {
                throw error;
            });

    } catch (error) {
        console.log(error.message, error.stack);
        JSONResponse.serverError(req, res, null);
    }
});

export default electionAuthorityRouter;