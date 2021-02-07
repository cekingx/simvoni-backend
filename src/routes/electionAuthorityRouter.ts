import express from 'express';
import UserDAO from '../models/UserDAO';
import JSONResponse from '../libs/JSONResponse';
import JWT from '../libs/JWT';
const electionAuthorityRouter = express.Router();

let user = new UserDAO();

electionAuthorityRouter.post('/set-wallet-address', (req, res) => {
    try {
        let authHeader      = req.headers.authorization;
        let token           = authHeader.split(' ')[1];
        let payload: any    = JWT.getPayload(token);
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
