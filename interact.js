const Web3 = require('web3');
const web3 = new Web3('http://localhost:8545'); // Ganache URL

const accessControlABI = [[
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "roles",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "user",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "role",
          "type": "string"
        }
      ],
      "name": "assignRole",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "user",
          "type": "address"
        }
      ],
      "name": "getRole",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    }
  ]];
const timeContextABI = [[
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "getCurrentHour",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    }
  ]];

const accessControlAddress = '0xB1338cdaEd710eb5138934a2F929958781408770'; 
const timeContextAddress = '0xdbe66b2a40AbFB9a72bfb4E417f016894b2f3FFB'; 

const AccessControl = new web3.eth.Contract(accessControlABI, accessControlAddress);
const TimeContext = new web3.eth.Contract(timeContextABI, timeContextAddress);

module.exports = async function(callback) {
    try {
        const accounts = await web3.eth.getAccounts();

        // Assign roles
        await accessControlContract.methods.assignRole(accounts[1], 'admin').send({ from: accounts[0] });
        await accessControlContract.methods.assignRole(accounts[3], 'user').send({ from: accounts[1] });

        // Check roles
        console.log(await accessControlContract.methods.getRole(accounts[0]).call()); // Should be 'admin'
        console.log(await accessControlContract.methods.getRole(accounts[3]).call()); // Should be 'user'

        // Additional interactions with the contracts
    } catch (error) {
        console.error('An error occurred:', error);
    }

    callback();
};
