import express from 'express';
import User from '../models/User';
import JSONResponse from '../libs/JSONResponse';
import JWT from '../libs/JWT';
const indexRouter = express.Router();

let user = new User();

indexRouter.post('/login', (req, res) => {
    try {
        let data = {
            username: req.body.username,
            password: req.body.password
        }

        user.login(data, (status: any, role: any) => {
            if(status) {
                console.log(true);
                let token = JWT.makeToken(data.username, role);
                JSONResponse.success(req, res, 'Success Login', {accessToken: token});
            } else {
                console.log(false);
                JSONResponse.unauthorized(req, res, 'Username atau Password salah');
            }
        });

    } catch (error) {
        console.log(error.message, error.stack);
        JSONResponse.serverError(req, res, null);
    }
});

export default indexRouter;