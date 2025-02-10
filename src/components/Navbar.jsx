import React from "react";
import Select from "react-select";
import { Menu, Button, Icon } from "semantic-ui-react";

// Gaya kustom untuk dropdown
const customStyles = {
  control: (provided) => ({
    ...provided,
    width: "170px",
    minHeight: "40px",
    borderRadius: "8px",
    fontWeight: "bold",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
  }),
  menu: (provided) => ({
    ...provided,
    zIndex: 9999,
    textAlign: "left",
    fontSize: "14px",
    borderRadius: "8px",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
  }),
  singleValue: (provided) => ({
    ...provided,
    display: "flex",
    alignItems: "center",
  }),
  option: (provided, { isFocused }) => ({
    ...provided,
    display: "flex",
    alignItems: "center",
    background: isFocused ? "#f0f0f0" : "white",
    color: "#333",
    padding: "10px",
  }),
};

// Opsi jaringan dengan ikon
const networkOptions = [
  {
    value: "berachain",
    label: (
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <img
          src="https://pbs.twimg.com/profile_images/1775162753499508736/2XBUzQhl_400x400.jpg"
          alt="Berachain"
          style={{ width: "24px", height: "24px", borderRadius: "50%" }}
        />
        Berachain
      </div>
    ),
  },
  {
    value: "soneium",
    label: (
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <img
          src="https://pbs.twimg.com/profile_images/1826820032103677954/ujzFVEj0_400x400.jpg"
          alt="Soneium"
          style={{ width: "24px", height: "24px", borderRadius: "50%" }}
        />
        Soneium
      </div>
    ),
  },
  {
    value: "ink",
    label: (
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <img
          src="https://pbs.twimg.com/profile_images/1851260672354480128/K6ZudYbl_400x400.jpg"
          alt="Ink"
          style={{ width: "24px", height: "24px", borderRadius: "50%" }}
        />
        Ink
      </div>
    ),
  },
];

const Navbar = ({ network, setNetwork, connectWallet, disconnectWallet, walletAddress }) => {
  const handleNetworkChange = (selected) => {
    setNetwork(selected.value);
  };

  return (
    <div>
      {/* Navbar */}
      <Menu
        secondary
        style={{
          padding: "10px 15px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap", // Pastikan item tidak terpotong di mobile
        }}
      >
        {/* Logo */}
        <Menu.Item
          header
          style={{
            fontSize: "20px",
            fontWeight: "bold",
            color: "#023859",
            display: "flex",
            alignItems: "center",
            flex: "1", // Biarkan fleksibel
          }}
        >
          <Icon name="rocket" color="red" />
          ERC-20 Token Factory
        </Menu.Item>

        {/* Dropdown Jaringan + Wallet Info */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            flexWrap: "wrap", // Agar tidak terpotong di mobile
            justifyContent: "flex-end", // Biar tetap di kanan
          }}
        >
          {/* Dropdown Pilihan Jaringan */}
          <div style={{ minWidth: "180px" }}> {/* Agar dropdown tidak mengecil di mobile */}
            <Select
              options={networkOptions}
              value={networkOptions.find((opt) => opt.value === network)}
              onChange={handleNetworkChange}
              styles={customStyles}
              menuPortalTarget={document.body}
            />
          </div>

          {/* Status Wallet */}
          {!walletAddress ? (
            <Button
              color="blue"
              onClick={connectWallet}
              style={{
                fontSize: "14px",
                fontWeight: "bold",
                borderRadius: "8px",
                whiteSpace: "nowrap", // Agar tidak terpotong di mobile
                display: "flex",
                alignItems: "center",
                gap: "5px", // Spasi antara ikon dan teks
              }}
            >
              {/* Tambahkan logo Metamask di sebelah kiri teks */}
              <img
                src="https://pbs.twimg.com/profile_images/1514275943300284417/2Ubgzfgg_400x400.jpg"
                alt="Metamask"
                style={{
                  width: "14px",
                  height: "14px",
                  borderRadius: "50%",
                }}
              />
              Connect Wallet
            </Button>
          ) : (
            <Button
              color="grey"
              onClick={disconnectWallet}
              style={{
                fontSize: "14px",
                fontWeight: "bold",
                borderRadius: "8px",
                whiteSpace: "nowrap", // Agar tidak terpotong di mobile
              }}
            >
              <Icon name="sign-out" />
              {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
            </Button>
          )}
        </div>
      </Menu>

      {/* Garis Pembatas */}
      <hr style={{ border: "1px solid #ddd", margin: "0 15px" }} />
    </div>
  );
};

export default Navbar;
