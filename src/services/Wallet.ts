import web3 from "web3";
import dotenv from "dotenv";

class WalletService {
    public web3: web3;

    constructor()
    {
        dotenv.config();
        let host = process.env.ETHEREUM_NODE || 'http://127.0.0.1:7545';
        this.web3 = new web3(host);
    }

    getWalletAddress(): any
    {
        let account = this.web3.eth.accounts.create();

        return account;
    }
}

export default WalletService;