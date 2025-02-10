import React from "react";
import { Segment, Button, Icon } from "semantic-ui-react";
import NETWORKS from "./networks";

const WalletInfo = ({ walletAddress, walletBalance, network, connectWallet, disconnectWallet }) => {
  return (
    <Segment
      padded
      style={{
        textAlign: "center",
        borderRadius: "8px",
        background: "#f8f9fa",
        maxWidth: "400px",
        width: "100%",
        margin: "auto",
      }}
    >
      {walletAddress ? (
        <>
          <Button
            style={{
              width: "100%",
              fontSize: "16px",
              fontWeight: "bold",
              backgroundColor: "#004085", // Biru lebih gelap agar lebih soft
              color: "white",
              borderRadius: "8px",
              transition: "all 0.3s ease",
            }}
            onClick={disconnectWallet}
            icon
            labelPosition="right"
          >
            <Icon name="log out" />
            Disconnect Wallet
          </Button>
          <p style={{ marginTop: "10px", fontSize: "14px", fontWeight: "bold" }}>
            <Icon name="ethereum" /> Address: {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
          </p>
          <p style={{ fontSize: "14px" }}>
            Balance: <strong>{walletBalance} {NETWORKS[network].currency}</strong>
          </p>
        </>
      ) : (
        <Button
          primary
          fluid
          onClick={connectWallet}
          style={{
            fontSize: "16px",
            fontWeight: "bold",
            backgroundColor: "#007bff",
            borderRadius: "8px",
          }}
        >
          <Icon name="wallet" />
          Connect Wallet
        </Button>
      )}
    </Segment>
  );
};

export default WalletInfo;
