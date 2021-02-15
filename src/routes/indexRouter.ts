import express from 'express';
import User from '../models/User';
import UserDAO from '../models/UserDAO';
import JSONResponse from '../libs/JSONResponse';
import JWT from '../libs/JWT';
const indexRouter = express.Router();

let user = new UserDAO();

indexRouter.post('/login', (req, res) => {
    try {
        let username = req.body.username;
        let password = req.body.password;

        user.login(username, password)
            .then((user: User | Error) => {
                if(user instanceof Error) {
                    console.log(false);
                    JSONResponse.unauthorized(req, res, user.message);
                    return;
                }

                console.log(true);
                let token = JWT.makeToken(user.username, user.role);
                JSONResponse.success(req, res, 'Success Login', {
                    username    : user.username,
                    name        : user.name,
                    role        : user.role,
                    token       : token
                });
            })
            .catch(error => {
                throw error;
            });

    } catch (error) {
        console.log(error.message, error.stack);
        JSONResponse.serverError(req, res, null);
    }
});

export default indexRouter;