// SentToken.js
import React, { useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import { Buffer } from "buffer";

// Ensure Buffer is available globally
window.Buffer = Buffer;

const SentToken = () => {
  const [to, setto] = useState("");
  const [amount, setamount] = useState("");
  const { publicKey, sendTransaction } = useWallet();
  const { connection } = useConnection();

  const makeTransaction = async () => {
    if (!publicKey) throw new Error("Wallet is not connected");

    if (!to || !amount) throw new Error("Please fill in all fields.");

    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: publicKey,
        toPubkey: new PublicKey(to),
        lamports: amount * LAMPORTS_PER_SOL, // Converting SOL to lamports
      })
    );

    await sendTransaction(transaction, connection);
    setto("");
    setamount("");
  };

  return (
    <div>
      <div className="text-center p-2 border-2 ">
        <h2 className="text-2xl font-bold text-red-400">Sending Sol</h2>
      </div>
      <input
        className="w-full p-3 mb-4 border border-gray-300 rounded-lg shadow-md bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150 ease-in-out"
        placeholder="Receiver Public Key"
        type="text"
        value={to}
        onChange={(e) => {
          setto(e.target.value);
        }}
      />
      <input
        className="w-full p-3 mb-4 border border-gray-300 rounded-lg shadow-md bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150 ease-in-out"
        value={amount}
        placeholder="Enter Amount in SOL"
        type="text"
        onChange={(e) => setamount(e.target.value)}
      />

      <button
        className="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
        onClick={makeTransaction}
      >
        Send
      </button>
    </div>
  );
};

export default SentToken;
