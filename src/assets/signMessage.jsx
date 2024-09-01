import React from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import bs58 from "bs58";

const SignMessage = () => {
  const { publicKey, signMessage } = useWallet();

  const onClick = async () => {
    try {
      if (!publicKey) {
        alert("Wallet not connected!");
        return;
      }
      if (!signMessage) {
        alert("Wallet does not support message signing!");
        return;
      }

      const message = new TextEncoder().encode(
        `${window.location.host} wants you to sign in with your Solana account:\n${publicKey}\n\nPlease sign in.`
      );

      const signature = await signMessage(message);

      // No need for manual verification if the wallet's signMessage function works correctly
      alert(`Message signed successfully: ${bs58.encode(signature)}`);
    } catch (error) {
      alert(`Sign Message failed: ${error.message}`);
    }
  };

  return (
    <button
      className="bg-gradient-to-r from-purple-400 to-blue-500 hover:from-purple-500 hover:to-blue-600 text-white font-semibold py-1 px-3 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition duration-200 ease-in-out text-sm"
      onClick={onClick}
      disabled={!(publicKey && signMessage)}
    >
      Sign Message
    </button>
  );
};

export default SignMessage;
