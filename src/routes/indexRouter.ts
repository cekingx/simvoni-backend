import express from 'express';
import User from '../models/User';
import JSONResponse from '../libs/JSONResponse';
import JWT from '../libs/JWT';
const indexRouter = express.Router();

let user = new User();

indexRouter.post('/login', (req, res) => {
    try {
        let username = req.body.username;
        let password = req.body.password;

        user.login(username, password)
            .then((data) => {
                if(data.status) {
                    console.log(true);
                    let token = JWT.makeToken(data.username, data.role);
                    JSONResponse.success(req, res, 'Success Login', {
                        username    : data.username,
                        name        : data.name,
                        role        : data.role,
                        token       : token
                    });
                } else {
                    console.log(false);
                    JSONResponse.unauthorized(req, res, data.message);
                }
            })
            .catch(error => {
                throw error;
            })
    } catch (error) {
        console.log(error.message, error.stack);
        JSONResponse.serverError(req, res, null);
    }
});

export default indexRouter;