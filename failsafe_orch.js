const Web3 = require("web3");
require("dotenv").config();

const web3 = new Web3(process.env.web3);
const Private_Key_main_account =
  process.env.Private_Key_main_account.substring(2);
const main_address = process.env.main_address.substring(2);

const create_contract = process.env.failsafe_orch;

async function sendtx() {
  const gasPrice = await web3.eth.getGasPrice();
  const nonce = await web3.eth.getTransactionCount(main_address, "latest");
  console.log("gasPrice: " + gasPrice);
  console.log("nonce: " + nonce);
  await web3.eth.accounts
    .signTransaction(
      {
        to: "",
        data: create_contract,
        gas: 5000000,
        gasPrice: gasPrice,
        nonce: nonce,
      },
      Private_Key_main_account
    )
    .then((encodedTransaction) =>
      web3.eth
        .sendSignedTransaction(encodedTransaction.rawTransaction)
        .then((receipt) => {
          tx = encodedTransaction.transactionHash;
          console.log("tx" + tx);
          console.log("success");
        })
        .catch(async (error) => {
          console.log("error");
        })
    );
}

sendtx();
