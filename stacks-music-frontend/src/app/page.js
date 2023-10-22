"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./page.module.css";

import { Connect } from "@stacks/connect-react";

import ConnectWallet, { userSession } from "../components/ConnectWallet";
import ContractCallVote from "../components/ContractCallVote";

export default function Home() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <Connect
      authOptions={{
        appDetails: {
          name: "Stacks Next.js Template",
          icon: window.location.origin + "/logo.png",
        },
        redirectTo: "/",
        onFinish: () => {
          window.location.reload();
        },
        userSession,
      }}
    >
      <main className={styles.main}>
        <div className={styles.description}>
        </div>


        <div>
          {/* ConnectWallet file: `./src/components/ConnectWallet.js` */}
          <ConnectWallet />

          {/* ContractCallVote file: `./src/components/ContractCallVote.js` */}
          <ContractCallVote />
        </div>

        <div className={styles.grid}>
        </div>
      </main>
    </Connect>
  );
}
