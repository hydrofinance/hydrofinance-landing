import Web3 from "web3";
import { AbiItem } from "web3-utils";
import BigNumber from "bignumber.js";
import { Dispatch } from "redux";
import { erc20ABI } from "./abi";
import { showSnackbar } from "../common/redux/snackbar";

export async function approval(props: {
  web3: Web3;
  address: string;
  tokenAddress: string;
  contractAddress: string;
  dispatch: Dispatch;
}): Promise<string> {
  const { web3, address, tokenAddress, contractAddress, dispatch } = props;

  return new Promise<string>((resolve, reject) => {
    const contract = new web3.eth.Contract(erc20ABI as AbiItem[], tokenAddress);

    contract.methods
      .approve(contractAddress, web3.utils.toWei("100000000000", "ether"))
      .send({ from: address })
      .on("transactionHash", (hash: string) => {
        dispatch(
          showSnackbar({ message: hash, type: "success" })
        );
      })
      .on("receipt", function () {
        resolve(new BigNumber(8000000000).toString());
      })
      .on("error", function (error: Error) {
        reject(error);
      })
      .catch((error: Error) => {
        reject(error);
      });
  });
}
