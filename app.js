//import Web3 from 'web3';

document.getElementById("send").addEventListener("click", connectWallet);

function send() {
    document.getElementById("walletaddress").value = "00x"
}

document.getElementById("connect").addEventListener("click", connectWallet);

function connect() {
    document.getElementById("walletaddress").value = "65400x"
}

var account = null;
var contract = null;

const ABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[],"name":"_totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"remaining","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"success","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"balance","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"address","name":"minter","type":"address"}],"name":"mintTokens","outputs":[{"internalType":"bool","name":"success","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"success","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"success","type":"bool"}],"stateMutability":"nonpayable","type":"function"}];
const contractAddress = "0xa22D416b61384E231e3300aA23FC31ba2bB6D9A8";

async function connectWallet() {
        if(window.ethereum) {
            var web3 = new Web3(window.ethereum);
            await window.ethereum.send('eth_requestAccounts');
            var accounts = await web3.eth.getAccounts();
            account = accounts[0];
            document.getElementById("connect").textContent = account;

            contract = new web3.eth.Contract(ABI, contractAddress);
        }
}

async function transfer() {

    if(contract == null) {
        console.error("Contract does not exist!");
        return;
    }

    const address = document.getElementById("walletaddress").value;
    const amount =  document.getElementById("walletamount").value;

    await contract.methods.transfer(address, amount).send({from: account});

}

async function getUserBalance() {

    if(contract == null) {
        console.error("Contract does not exist!");
        return;
    }

    const _userBalance = await contract.methods.balanceOf(account).call();
    document.getElementById("mlzybalance").textContent = _userBalance + " $MLZY";

}

async function mintTokens() {

    if(contract == null) {
        console.error("Contract does not exist!");
        return;
    }

    const _amount = document.getElementById("mintamount").value;

    try {
        await contract.methods.mintTokens(_amount, account).send({from: account});
    } catch(error) {
        console.log(error);

    }
       
}

async function getTotalSupply() {

    if(contract == null) {
        console.error("Contract does not exist!");
        return;
    }

    const _supply = await contract.methods.totalSupply().call();
    console.log(_supply);
    document.getElementById("mlzysupplyy").textContent = _supply + " $MLZY";

}