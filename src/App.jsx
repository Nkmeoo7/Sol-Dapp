import React from "react";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";

import {
  WalletModalProvider,
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";

// Default styles that can be overridden by your app
import "@solana/wallet-adapter-react-ui/styles.css";

import "./App.css";
import { Airdrop } from "./airdrop";
import GetSolBalance from "./assets/getBalance";
import SignMessage from "./assets/signMessage";
import SentToken from "./assets/sentSol";

function App() {
  return (
    <ConnectionProvider
      endpoint={
        "https://solana-devnet.g.alchemy.com/v2/C22xbA6F4Kavwhp49VXCTYPcAjOdZfdb" // if somoone looking this code please change your rdp server
      }
    >
      <WalletProvider wallets={[]} autoConnect>
        <WalletModalProvider>
          <div className="flex justify-between items-center bg-gray-900">
            <div className="flex justify-between items-center p-2 bg-gray-900 text-white">
              <h1 className="text-2xl font-extrabold p-3">
                Sol <span className="text-blue-400">Dapp</span>
              </h1>
              <div className="flex items-center space-x-4 ">
                <SignMessage />
              </div>
            </div>

            <div className="flex items-center space-x-4 ">
              <GetSolBalance />
              <WalletMultiButton />
              <WalletDisconnectButton />
            </div>
          </div>

          <div>
            <Airdrop></Airdrop>
            <SentToken></SentToken>
          </div>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export default App;
