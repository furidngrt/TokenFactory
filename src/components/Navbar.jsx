import React from "react";
import { Menu, Button, Icon } from "semantic-ui-react";
import NetworkSelector from "./NetworkSelector";

const Navbar = ({ network, setNetwork, connectWallet, disconnectWallet, walletAddress }) => {
  return (
    <div>
      {/* Navbar */}
      <Menu secondary className="navbar-container">
        {/* Logo */}
        <Menu.Item
          header
          style={{
            fontSize: "20px",
            fontWeight: "bold",
            color: "#023859",
            display: "flex",
            alignItems: "center",
            flex: "1",
          }}
        >
          <Icon name="rocket" color="red" />
          Token Factory
        </Menu.Item>

        {/* Dropdown Jaringan + Wallet Info */}
        <div className="navbar-content">
          {/* Gunakan NetworkSelector */}
          <NetworkSelector network={network} setNetwork={setNetwork} />

          {/* Status Wallet */}
          {!walletAddress ? (
            <Button color="blue" onClick={connectWallet} className="wallet-button">
              Connect Wallet
            </Button>
          ) : (
            <Button color="grey" onClick={disconnectWallet} className="wallet-button">
              <Icon name="sign-out" />
              {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
            </Button>
          )}
        </div>
      </Menu>

      {/* Garis Pembatas */}
      <hr className="navbar-divider" />

      {/* Tambahkan CSS untuk tampilan mobile */}
      <style>{`
        /* Default (Desktop) */
        .navbar-container {
          padding: 10px 15px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
        }
        .navbar-content {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
          justify-content: flex-end;
        }
        .wallet-button {
          font-size: 14px;
          font-weight: bold;
          border-radius: 8px;
          min-width: 140px;
          height: 38px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 5px;
        }

        /* Mobile (<768px) */
        @media (max-width: 767px) {
          .navbar-container {
            flex-direction: column;
            align-items: center;
            text-align: center;
            padding: 8px;
          }
          .navbar-content {
            width: 100%;
            justify-content: center;
          }
          .wallet-button {
            min-width: 170px;
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
};

export default Navbar;
