import { AbiItem } from "web3-utils";

const abi: AbiItem[] = [
    {
        "inputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "constant": false,
        "inputs": [],
        "name": "start_election",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [],
        "name": "end_election",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
            "internalType": "string",
            "name": "id",
            "type": "string"
            }
        ],
        "name": "register_candidate",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
            "internalType": "string",
            "name": "id",
            "type": "string"
            }
        ],
        "name": "vote",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "get_num_candidates",
        "outputs": [
            {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "internalType": "uint256",
                "name": "i",
                "type": "uint256"
            }
        ],
        "name": "get_candidate",
        "outputs": [
            {
                "internalType": "string",
                "name": "_candidate",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "_votes",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "get_election_status",
        "outputs": [
            {
                "internalType": "string",
                "name": "_status",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }
];

export default abi;