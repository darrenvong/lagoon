"use client";

import React, { useEffect, useState } from "react";
import { useConnect } from "@stacks/connect-react";
import { StacksTestnet, StacksDevnet } from "@stacks/network";
import {
  AnchorMode,
  PostConditionMode,
  stringAsciiCV,
  uintCV,
  principalCV,
} from "@stacks/transactions";
import { userSession } from "./ConnectWallet";

const ContractCallVote = () => {
  const { doContractCall } = useConnect();

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  function mint() {
    doContractCall({
      network: new StacksDevnet(),
      anchorMode: AnchorMode.Any,
      contractAddress: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
      contractName: "non-fungible-token",
      functionName: "mint",
      functionArgs: [
        // TODO: read this from user session of the connected wallet user
        principalCV("STZ5MHA69PWEB7ZK1RTGFE5YFETFX78ZF9JN1FV6"),
        stringAsciiCV("Hackathon"),
        stringAsciiCV("EasyA"),
        uintCV(120),
      ],
      postConditionMode: PostConditionMode.Deny,
      postConditions: [],
      onFinish: (data) => {
        console.log("onFinish:", data);
        window
          .open(
            `http://localhost:8000/txid/${data.txId}?chain=testnet`,
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
