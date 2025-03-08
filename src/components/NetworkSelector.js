// NetworkSelector.jsx - Fixed z-index and positioning
import React from "react";
import Select from "react-select";

const NetworkSelector = ({ network, setNetwork, isMobile = false }) => {
  // Custom styles for the dropdown - with fixed z-index and positioning
  const customStyles = {
    control: (provided) => ({
      ...provided,
      width: isMobile ? "100%" : "180px",
      minHeight: isMobile ? "48px" : "40px",
      borderRadius: "8px",
      fontWeight: "bold",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      border: "1px solid #e0e0e0",
      boxShadow: "none",
      "&:hover": {
        border: "1px solid #3498db",
      },
    }),
    menu: (provided) => ({
      ...provided,
      zIndex: 9999, // Ensure this is a high value
      position: "absolute",
      textAlign: "left",
      fontSize: "14px",
      borderRadius: "8px",
      boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.15)",
      marginTop: "4px",
      overflow: "hidden",
      width: "100%",
      backgroundColor: "white",
    }),
    menuList: (provided) => ({
      ...provided,
      padding: "5px",
      maxHeight: "300px",
    }),
    singleValue: (provided) => ({
      ...provided,
      display: "flex",
      alignItems: "center",
    }),
    option: (provided, { isFocused, isSelected }) => ({
      ...provided,
      display: "flex",
      alignItems: "center",
      background: isSelected ? "#ebf5fb" : isFocused ? "#f7f9fa" : "white",
      color: "#333",
      padding: isMobile ? "12px" : "10px",
      "&:hover": {
        backgroundColor: "#f7f9fa",
      },
      cursor: "pointer",
    }),
    valueContainer: (provided) => ({
      ...provided,
      padding: "2px 8px",
    }),
    indicatorSeparator: () => ({
      display: "none",
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      color: "#95a5a6",
      "&:hover": {
        color: "#3498db",
      },
    }),
    menuPortal: (base) => ({
      ...base,
      zIndex: 9999,
    }),
  };

  // Network options with icons
  const networkOptions = [
    {
      value: "soneium",
      label: (
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <img
            src="https://pbs.twimg.com/profile_images/1826820032103677954/ujzFVEj0_400x400.jpg"
            alt="Soneium"
            style={{ width: "24px", height: "24px", borderRadius: "50%" }}
          />
          <span style={{ fontWeight: "500" }}>Soneium</span>
        </div>
      ),
    },
    {
      value: "ink",
      label: (
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <img
            src="https://pbs.twimg.com/profile_images/1851260672354480128/K6ZudYbl_400x400.jpg"
            alt="Ink"
            style={{ width: "24px", height: "24px", borderRadius: "50%" }}
          />
          <span style={{ fontWeight: "500" }}>Ink</span>
        </div>
      ),
    },
    {
      value: "unichain",
      label: (
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <img
            src="https://pbs.twimg.com/profile_images/1844360745649057798/iwEWAS02_400x400.jpg"
            alt="Unichain"
            style={{ width: "24px", height: "24px", borderRadius: "50%" }}
          />
          <span style={{ fontWeight: "500" }}>Unichain</span>
        </div>
      ),
    },
    {
      value: "linea",
      label: (
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <img
            src="https://pbs.twimg.com/profile_images/1882602161378373632/xbIeaav1_400x400.png"
            alt="Linea"
            style={{ width: "24px", height: "24px", borderRadius: "50%" }}
          />
          <span style={{ fontWeight: "500" }}>Linea</span>
        </div>
      ),
    },
    {
      value: "monad",
      label: (
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <img
            src="https://pbs.twimg.com/profile_images/1877532281419739137/I_t8rg_V_400x400.jpg"
            alt="Monad"
            style={{ width: "24px", height: "24px", borderRadius: "50%" }}
          />
          <span style={{ fontWeight: "500" }}>Monad Testnet</span>
        </div>
      ),
    },
    {
      value: "berachain",
      label: (
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <img
            src="https://pbs.twimg.com/profile_images/1775162753499508736/2XBUzQhl_400x400.jpg"
            alt="Berachain"
            style={{ width: "24px", height: "24px", borderRadius: "50%" }}
          />
          <span style={{ fontWeight: "500" }}>Berachain</span>
        </div>
      ),
    },
    {
      value: "story",
      label: (
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <img
            src="https://pbs.twimg.com/profile_images/1820303986349805569/MKfPfLtz_400x400.jpg"
            alt="Story"
            style={{ width: "24px", height: "24px", borderRadius: "50%" }}
          />
          <span style={{ fontWeight: "500" }}>Story Mainnet</span>
        </div>
      ),
    },
  ];

  const handleNetworkChange = (selected) => {
    setNetwork(selected.value);
  };

  return (
    <div 
      style={{ 
        width: isMobile ? "100%" : "auto",
        position: "relative", // Important for z-index context
        zIndex: 1000 // Higher than buttons but lower than menu portal
      }}
    >
      <Select
        options={networkOptions}
        value={networkOptions.find((opt) => opt.value === network)}
        onChange={handleNetworkChange}
        styles={customStyles}
        menuPortalTarget={document.body}
        menuPlacement="auto"
        isSearchable={false}
        components={{
          IndicatorSeparator: () => null
        }}
      />
    </div>
  );
};

export default NetworkSelector;