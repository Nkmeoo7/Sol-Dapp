import React, { useState } from "react";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";

const GetSolBalance = () => {
  const { publicKey } = useWallet();
  const { connection } = useConnection();
  const [balance, setBalance] = useState(null);

  const balanceHandler = async () => {
    if (publicKey) {
      try {
        const balanceInLamports = await connection.getBalance(publicKey);
        setBalance(balanceInLamports / 1e9); // Convert lamports to SOL
      } catch (error) {
        console.error("Error fetching balance:", error);
      }
    } else {
      console.warn("Wallet not connected");
    }
  };

  return (
    <div className="flex ">
      <div className="p-4 bg-gray-900 text-white">
        {balance !== null ? (
          <p className="text-lg font-semibold text-green-400">
            Balance:{" "}
            <span className="text-yellow-400">{balance.toFixed(2)}</span> SOL
          </p>
        ) : (
          <p className="text-lg font-semibold text-red-400">
            No balance available or you can retry
          </p>
        )}
      </div>

      <button
        onClick={balanceHandler}
        className="bg-blue-500 text-white p-2 rounded"
      >
        Check Balance
      </button>
    </div>
  );
};

export default GetSolBalance;
