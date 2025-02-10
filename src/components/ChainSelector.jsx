import React, { useState } from "react";
import Select from "react-select";
import NETWORKS from "./networks"; // Pastikan file NETWORKS.js ada

const customStyles = {
  control: (base) => ({
    ...base,
    backgroundColor: "#1a1a1a",
    borderColor: "#444",
    color: "#fff",
    padding: "8px",
    borderRadius: "8px",
    boxShadow: "none",
    "&:hover": { borderColor: "#666" },
  }),
  menu: (base) => ({
    ...base,
    backgroundColor: "#1a1a1a",
    borderRadius: "8px",
    padding: "5px",
  }),
  option: (base, { isFocused }) => ({
    ...base,
    backgroundColor: isFocused ? "#333" : "transparent",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    padding: "10px",
  }),
  singleValue: (base) => ({
    ...base,
    color: "#fff",
    display: "flex",
    alignItems: "center",
  }),
};

const ChainSelector = ({ network, setNetwork }) => {
  const options = Object.keys(NETWORKS).map((key) => ({
    value: key,
    label: (
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <img src={NETWORKS[key].icon} alt={key} width="20" height="20" />
        {NETWORKS[key].name}
      </div>
    ),
  }));

  return (
    <Select
      options={options}
      value={options.find((opt) => opt.value === network)}
      onChange={(selected) => setNetwork(selected.value)}
      styles={customStyles}
      isSearchable={true}
      placeholder="Search for a chain..."
    />
  );
};

export default ChainSelector;
