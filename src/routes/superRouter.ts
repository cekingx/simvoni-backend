import express from 'express';
import User from '../models/User';
import UserDAO from '../models/UserDAO';
import JSONResponse from '../libs/JSONResponse';
import JWT from '../libs/JWT';
const superRouter = express.Router();

let user = new UserDAO();

superRouter.post('/election-authority', (req, res) => {
    try {
        let userData: User = {
            username    : req.body.username,
            password    : req.body.password,
            name        : req.body.name
        };

        user.createElectionAuthority(userData)
            .then((user: User | Error) => {
                if(user instanceof Error) {
                    console.log(false);
                    JSONResponse.unauthorized(req, res, user.message);
                }

                JSONResponse.created(req, res, null, user);
            })
            .catch(error => {
                throw error;
            })
    } catch (error) {
        console.log(error.message, error.stack);
        JSONResponse.serverError(req, res, null);
    }
});

export default superRouter;