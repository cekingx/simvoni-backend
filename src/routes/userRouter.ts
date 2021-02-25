/**
 * REMOVE SOON 
 */ 

import * as express from 'express'
import User from '../models/User';
import JSONResponse from '../libs/JSONResponse';
const userRouter = express.Router()

let user = new User();

userRouter.get('/', (req, res) => {
    try{
        user.getAll()
            .then((result: any) => {
                if(result.length === 0) {
                    JSONResponse.notFound(req, res, null);
                } else {
                    JSONResponse.success(req, res, null, result);
                }
            })
            .catch(error => {
                throw(error);
            });
    } catch (error) {
        console.log(error.message, error.stack);
        JSONResponse.serverError(req, res, null);
    }
});

userRouter.get('/:id', (req, res) => {
    try{
        let id = req.params.id as String;
        user.getById(id, (result: any) => {
            if(result.length === 0) {
                JSONResponse.notFound(req, res, null);
            } else {
                JSONResponse.success(req, res, null, result);
            }
        })
    } catch (error) {
        console.log(error.message, error.stack);
        JSONResponse.serverError(req, res, null);
    }
});

userRouter.post('/', (req, res) => {
    try {
        let data = {
            user_username       : req.body.user_username,
            user_password       : req.body.user_password,
            user_nama           : req.body.user_nama,
            user_wallet_address : req.body.user_wallet_address,
            user_user_role_id   : req.body.user_user_role_id
        }
        user.createUser(data);
        JSONResponse.success(req, res, null, 'Oke');
    } catch (error) {
        console.log(error.message, error.stack);
        JSONResponse.serverError(req, res, null);
    }
});

export default userRouter;