import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import TokenFactoryABI from "./components/TokenFactoryABI.json";
import NETWORKS from "./components/networks";
import Navbar from "./components/Navbar";
import TokenForm from "./components/TokenForm";
import MessageBox from "./components/MessageBox";
import Footer from "./components/Footer";
import { Container } from "semantic-ui-react";

const TokenFactory = () => {
  const [network, setNetwork] = useState("soneium");
  const [factoryAddress, setFactoryAddress] = useState(NETWORKS["soneium"].factoryAddress);
  const [walletAddress, setWalletAddress] = useState(null);
  const [walletBalance, setWalletBalance] = useState(null);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [totalSupply, setTotalSupply] = useState("");
  const [message, setMessage] = useState(null);
  const [creatingToken, setCreatingToken] = useState(false);

  // 🔄 Inisialisasi provider dan reconnect wallet saat halaman di-refresh
  useEffect(() => {
    if (window.ethereum) {
      const newProvider = new ethers.BrowserProvider(window.ethereum);
      setProvider(newProvider);
      checkIfWalletConnected(newProvider);
    }
  }, []);

  useEffect(() => {
    if (NETWORKS[network]) {
      setFactoryAddress(NETWORKS[network].factoryAddress);
    }
  }, [network]);

  // ✅ Cek apakah wallet sudah terhubung sebelumnya
  const checkIfWalletConnected = async (providerInstance) => {
    try {
      const accounts = await window.ethereum.request({ method: "eth_accounts" });
      if (accounts.length > 0) {
        reconnectWallet(providerInstance, accounts[0]);
      }
    } catch (error) {
      console.error("Failed to check wallet connection:", error);
    }
  };

  // 🔄 Reconnect wallet jika sebelumnya sudah terhubung
  const reconnectWallet = async (providerInstance, savedWallet) => {
    try {
      const walletSigner = await providerInstance.getSigner();
      const balance = await providerInstance.getBalance(savedWallet);

      setWalletAddress(savedWallet);
      setSigner(walletSigner);
      setWalletBalance(parseFloat(ethers.formatEther(balance)).toFixed(2));
    } catch (error) {
      console.error("Failed to reconnect wallet:", error);
    }
  };

  const connectWallet = async () => {
    if (!provider) {
      setMessage({ type: "error", content: "Metamask not detected!" });
      return;
    }

    try {
      const accounts = await provider.send("eth_requestAccounts", []);
      const walletSigner = await provider.getSigner();
      const balance = await provider.getBalance(accounts[0]);

      setWalletAddress(accounts[0]);
      setSigner(walletSigner);
      setWalletBalance(parseFloat(ethers.formatEther(balance)).toFixed(2));
    } catch (error) {
      setMessage({ type: "error", content: "Failed to connect Metamask!" });
    }
  };

  const disconnectWallet = () => {
    setWalletAddress(null);
    setWalletBalance(null);
    setSigner(null);
    setMessage({ type: "info", content: "Wallet disconnected." });
  };

  const createToken = async () => {
    if (!signer || !name || !symbol || !totalSupply) {
      setMessage({ type: "error", content: "Please fill in all fields!" });
      return;
    }

    try {
      setCreatingToken(true);
      setMessage(null);

      const factoryContract = new ethers.Contract(factoryAddress, TokenFactoryABI, signer);

      const tx = await factoryContract.createToken(
        name,
        symbol,
        ethers.parseUnits(totalSupply, 0),
        walletAddress
      );
      const receipt = await tx.wait();

      const event = receipt.logs.find((log) => log.address.toLowerCase() === factoryAddress.toLowerCase());
      const tokenAddress = event ? event.args[0] : null;

      if (tokenAddress) {
        setMessage({
          type: "success",
          content: `🎉 Token created! <a href="${NETWORKS[network].explorer}/address/${tokenAddress}" target="_blank">View on Explorer</a>`,
        });
      } else {
        setMessage({ type: "error", content: "Token created but unable to fetch contract address." });
      }

      setName("");
      setSymbol("");
      setTotalSupply("");
    } catch (error) {
      console.error(error);
      let errorMessage = "Failed to create token!";
      if (error.reason === "Token with this symbol already exists") {
        errorMessage = "🚨 Token with this symbol already exists!";
      }
      setMessage({ type: "error", content: errorMessage });
    }
    setCreatingToken(false);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "90vh" }}>
      {/* Navbar */}
      <Navbar
        network={network}
        setNetwork={setNetwork}
        connectWallet={connectWallet}
        disconnectWallet={disconnectWallet}
        walletAddress={walletAddress}
      />

      {/* Konten Tengah */}
      <Container style={{ flex: "1", maxWidth: "900px" }}>
        {message && (
          <div style={{ maxWidth: "500px", margin: "auto" }}>
            <MessageBox message={message} />
          </div>
        )}

        <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
          <TokenForm
            name={name}
            setName={setName}
            symbol={symbol}
            setSymbol={setSymbol}
            totalSupply={totalSupply}
            setTotalSupply={setTotalSupply}
            createToken={createToken}
            creatingToken={creatingToken}
          />
        </div>
      </Container>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default TokenFactory;
