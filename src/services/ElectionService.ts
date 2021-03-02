import web3 from "web3";
import dotenv from 'dotenv';
import * as BallotContract from './BallotContract.json';
import BallotAbi from './BallotAbi';
import { AbiItem } from "web3-utils";
import fs from "fs";
const contractFile = require('./BallotContract.json');

class ElectionService
{
    public web3: web3;
    public ContractDetail: any;

    constructor()
    {
        dotenv.config();
        let host = process.env.ETHEREUM_NODE || 'http://127.0.0.1:7545';
        this.web3 = new web3(host);
        // this.readContractFile();
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

    deployContractV2(sender: string): Promise<any>
    {
        // let abi = this.ContractDetail.abi;
        // let bytecode = this.ContractDetail.bytecode;
        let abi = contractFile.abi;
        let bytecode = contractFile.bytecode;
        let contract = new this.web3.eth.Contract(abi);
        return contract.deploy({
            data: bytecode
        })
        .send({
            from: sender,
            gas: 4712388
        })
        .then(contractInstance => {
            console.log(contractInstance);
            return contractInstance;
        })
        .catch(error => {
            console.log('Contract ' + error)
        });
        
    }

    getVotingStatus(contractAddress: String)
    {}

    getAllCandidates(contractAddress: String)
    {}

    getCandidate(contractAddress: String, candidateId: String)
    {}

    private readContractFile()
    {
        let contractJsonContent     = fs.readFileSync('./BallotContract.json', 'utf8');
        let jsonOutput              = JSON.parse(contractJsonContent);
        this.ContractDetail         = jsonOutput;
    }
}

export default ElectionService;