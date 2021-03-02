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

    /**
     * @deprecated
     */
    getWalletAddress(): any
    {
        let account = this.web3.eth.accounts.create();

        return account;
    }

    createAccount(password: string): Promise<any>
    {
        let account = this.web3.eth.accounts.create();

        return this.web3.eth.personal.importRawKey(account.privateKey, password)
            .then(() => {
                return account
            });
    }

    unlockAccount(address: string, password: string): Promise<boolean>
    {
        return this.web3.eth.personal.unlockAccount(address, password, 600);
    }

    sendEther(sender: string, senderPassword: string, receiver: string, amount: string): Promise<any>
    {
        return this.web3.eth.personal.sendTransaction({
            from: sender,
            gasPrice: '20000000000',
            gas: '21000',
            to: receiver,
            value: amount,
            data: ''
        }, senderPassword);
    }
}

export default WalletService;