// Airdrop.js
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useState } from "react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

export const Airdrop = () => {
  const wallet = useWallet();
  const { connection } = useConnection();
  const [amount, setAmount] = useState("");

  const sendAirdropToUser = async () => {
    if (!wallet.publicKey) {
      console.log("Wallet not connected!");
      return;
    }

    const lamports = parseFloat(amount) * LAMPORTS_PER_SOL;

    try {
      const signature = await connection.requestAirdrop(
        wallet.publicKey,
        lamports
      );
      await connection.confirmTransaction(signature, "confirmed");
      console.log(`Airdrop successful! Txn Signature: ${signature}`);
    } catch (error) {
      console.error("Airdrop failed:", error);
    }
  };

  return (
    <div>
      <div className="text-center p-2 border-2 ">
        <h2 className="text-2xl font-bold text-purple-400">Airdrop SOL</h2>
      </div>
      <input
        className="w-full p-3 mb-4 border border-gray-300 rounded-lg shadow-md bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150 ease-in-out"
        placeholder="Enter amount in SOL"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <button
        className="bg-pink-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
        onClick={sendAirdropToUser}
      >
        Airdrop SOL
      </button>
    </div>
  );
};
