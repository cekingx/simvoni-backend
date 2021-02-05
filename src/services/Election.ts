import web3 from "web3";
import dotenv from 'dotenv';
import * as BallotContract from './BallotContract.json';
import BallotAbi from './BallotAbi';
import { AbiItem } from "web3-utils";

class ElectionService
{
    public web3: web3;

    constructor()
    {
        dotenv.config();
        let host = process.env.ETHEREUM_NODE || 'http://127.0.0.1:7545';
        this.web3 = new web3(host);
    }

    getAccounts()
    {
        let data = this.web3.eth.getAccounts();
        return data;
    }

    getBalance(account: string)
    {
        let data = this.web3.eth.getBalance(account);
        return data;
    }

    deployContract(sender: string)
    {
        let Contract = new this.web3.eth.Contract(BallotAbi);

        return Contract.deploy({
            data: BallotContract.bytecode
        })
        .send({
            from: sender,
            gas: 4712388
        });
    }

    getVotingStatus(contractAddress: String)
    {}

    getAllCandidates(contractAddress: String)
    {}

    getCandidate(contractAddress: String, candidateId: String)
    {}
}

export default ElectionService;