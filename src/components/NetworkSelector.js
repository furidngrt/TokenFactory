import React from "react";
import Select from "react-select";

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
  {
    value: "unichain",
    label: (
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <img
          src="https://pbs.twimg.com/profile_images/1844360745649057798/iwEWAS02_400x400.jpg"
          alt="Unichain"
          style={{ width: "24px", height: "24px", borderRadius: "50%" }}
        />
        Unichain
      </div>
    ),
  },
  {
    value: "linea",
    label: (
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <img
          src="https://pbs.twimg.com/profile_images/1882602161378373632/xbIeaav1_400x400.png"
          alt="Linea"
          style={{ width: "24px", height: "24px", borderRadius: "50%" }}
        />
        Linea
      </div>
    ),
  },
];

const NetworkSelector = ({ network, setNetwork }) => {
  const handleNetworkChange = (selected) => {
    setNetwork(selected.value);
  };

  return (
    <div style={{ minWidth: "180px" }}>
      <Select
        options={networkOptions}
        value={networkOptions.find((opt) => opt.value === network)}
        onChange={handleNetworkChange}
        styles={customStyles}
        menuPortalTarget={document.body}
      />
    </div>
  );
};

export default NetworkSelector;
