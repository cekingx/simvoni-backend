import express from 'express';
import User from "../models/User";
import UserDAO from '../models/UserDAO';
import JSONResponse from '../libs/JSONResponse';
import JWT from '../libs/JWT';
import ElectionService from "../services/Election";
const electionAuthorityRouter = express.Router();

let user = new UserDAO();
let electionService = new ElectionService();

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

electionAuthorityRouter.post('/deploy-contract', (req, res) => {
    try {
        let payload: any    = JWT.getPayloadFronHeader(req.headers.authorization);
        let username        = payload.username;

        user.getUser(username)
            .then((user: User | Error) => {
                if(user instanceof Error) {
                    JSONResponse.notFound(req, res, user.message);
                    return;
                }

                if(user.wallet_address == null) {
                    JSONResponse.badRequest(req, res, 'User belum memiliki Wallet Address');
                    return;
                }

                console.log(user.wallet_address);
                electionService.deployContractV2(user.wallet_address)
                JSONResponse.success(req, res, null, user);
            })
    } catch (error) {
        console.log(error.message, error.stack);
        JSONResponse.serverError(req, res, null);
    }
});

export default electionAuthorityRouter;