"use client";

import React, { useEffect, useState } from "react";
import { useConnect } from "@stacks/connect-react";
import { StacksTestnet } from "@stacks/network";
import {
  AnchorMode,
  PostConditionMode,
  stringAsciiCV,
  uintCV,
  principalCV
} from "@stacks/transactions";
import { userSession } from "./ConnectWallet";

const ContractCallVote = () => {
  const { doContractCall } = useConnect();

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  function mint() {
    doContractCall({
      network: new StacksTestnet(),
      anchorMode: AnchorMode.Any,
      contractAddress: "SP2PABAF9FTAJYNFZH93XENAJ8FVY99RRM50D2JG9",
      contractName: "non-fungible-token",
      functionName: "mint",
      functionArgs: [principalCV("ST1SJ3DTE5DN7X54YDH5D64R3BCB6A2AG2ZQ8YPD5"),stringAsciiCV("Hackathon"),stringAsciiCV("EasyA"),uintCV(120)],
      postConditionMode: PostConditionMode.Deny,
      postConditions: [],
      onFinish: (data) => {
        console.log("onFinish:", data);
        window
          .open(
            `https://explorer.hiro.so/txid/${data.txId}?chain=testnet`,
            "_blank"
          )
          .focus();
      },
      onCancel: () => {
        console.log("onCancel:", "Transaction was canceled");
      },
    });
  }

  if (!mounted || !userSession.isUserSignedIn()) {
    return null;
  }

  return (
    <div className="Container">
      <h3>Mint</h3>
      <button className="Vote" onClick={() => mint()}>
        Mint
      </button>
    </div>
  );
};

export default ContractCallVote;
