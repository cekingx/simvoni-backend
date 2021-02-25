/**
 * MOVE TO ELECTION AUTHORITY ROUTER
 */

import express from 'express';
import ElectionService from '../services/ElectionService';
import JSONResponse from '../libs/JSONResponse';
const electionRouter = express.Router();

let electionService = new ElectionService();

electionRouter.get('/', (req, res) => {
    try {
        electionService.getAccounts()
            .then(result => {
                console.log(result);
                JSONResponse.success(req, res, null, result);
            })
    } catch (error) {
        console.log(error.message, error.stack);
        JSONResponse.serverError(req, res, null);
    }
});

electionRouter.get('/:account', (req, res) => {
    try {
        electionService.getBalance(req.params.account)
            .then(result => {
                console.log(result);
                JSONResponse.success(req, res, null, result);
            })
    } catch (error) {
        console.log(error.message, error.stack);
        JSONResponse.serverError(req, res, null);
    }
})

electionRouter.post('/deploy-contract', (req, res) => {
    try {
        electionService.deployContract(req.body.address)
            .then(contractInstance => {
                console.log(contractInstance.options);
                JSONResponse.success(req, res, null, contractInstance.options.address);
            })
            .catch(error => {
                console.log(error);
                JSONResponse.serverError(req, res, error);
            })
    } catch (error) {
        console.log(error.message, error.stack);
        JSONResponse.serverError(req, res, null);
    }
})

export default electionRouter;