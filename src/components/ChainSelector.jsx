import React, { useState, useEffect } from "react";
import Select from "react-select";
import NETWORKS from "./networks";

// Enhanced modern styling for the selector
const getCustomStyles = (isDarkMode = true) => ({
  control: (base, state) => ({
    ...base,
    backgroundColor: isDarkMode ? "#1a1a1a" : "#ffffff",
    borderColor: isDarkMode ? (state.isFocused ? "#3498db" : "#444") : (state.isFocused ? "#3498db" : "#e0e0e0"),
    color: isDarkMode ? "#fff" : "#333",
    padding: "6px 8px",
    borderRadius: "10px",
    boxShadow: state.isFocused ? `0 0 0 2px ${isDarkMode ? "rgba(52, 152, 219, 0.4)" : "rgba(52, 152, 219, 0.2)"}` : "none",
    transition: "all 0.2s ease",
    cursor: "pointer",
    "&:hover": { 
      borderColor: isDarkMode ? "#3498db" : "#3498db",
      boxShadow: `0 2px 8px ${isDarkMode ? "rgba(0, 0, 0, 0.3)" : "rgba(0, 0, 0, 0.1)"}`,
    },
    minHeight: "48px",
  }),
  menu: (base) => ({
    ...base,
    backgroundColor: isDarkMode ? "#1a1a1a" : "#ffffff",
    borderRadius: "10px",
    padding: "5px",
    overflow: "hidden",
    boxShadow: isDarkMode ? "0 5px 15px rgba(0, 0, 0, 0.5)" : "0 5px 15px rgba(0, 0, 0, 0.1)",
    animation: "fade-in 0.2s ease-out",
    zIndex: 10,
  }),
  option: (base, { isSelected, isFocused }) => ({
    ...base,
    backgroundColor: 
      isSelected 
        ? isDarkMode ? "#2980b9" : "#e1f0fa" 
        : isFocused 
            ? isDarkMode ? "#2c3e50" : "#f5fafd" 
            : "transparent",
    color: 
      isSelected 
        ? isDarkMode ? "#fff" : "#2980b9" 
        : isDarkMode ? "#fff" : "#333",
    display: "flex",
    alignItems: "center",
    padding: "10px 15px",
    cursor: "pointer",
    transition: "all 0.2s ease",
    "&:hover": {
      backgroundColor: isDarkMode ? "#2c3e50" : "#f5fafd",
    },
    borderRadius: "6px",
    margin: "2px 0",
  }),
  singleValue: (base) => ({
    ...base,
    color: isDarkMode ? "#fff" : "#333",
    display: "flex",
    alignItems: "center",
  }),
  input: (base) => ({
    ...base,
    color: isDarkMode ? "#fff" : "#333",
  }),
  placeholder: (base) => ({
    ...base,
    color: isDarkMode ? "#aaa" : "#999",
  }),
  indicatorSeparator: (base) => ({
    ...base,
    backgroundColor: isDarkMode ? "#444" : "#e0e0e0",
  }),
  dropdownIndicator: (base) => ({
    ...base,
    color: isDarkMode ? "#aaa" : "#999",
    "&:hover": {
      color: "#3498db",
    },
    transition: "all 0.2s ease",
  }),
  valueContainer: (base) => ({
    ...base,
    padding: "2px 8px",
  }),
  menuList: (base) => ({
    ...base,
    padding: "5px",
    "::-webkit-scrollbar": {
      width: "6px",
      height: "0px",
    },
    "::-webkit-scrollbar-track": {
      background: isDarkMode ? "#1a1a1a" : "#f1f1f1",
    },
    "::-webkit-scrollbar-thumb": {
      background: isDarkMode ? "#555" : "#c1c1c1",
      borderRadius: "3px",
    },
    "::-webkit-scrollbar-thumb:hover": {
      background: isDarkMode ? "#777" : "#a1a1a1",
    },
  }),
  noOptionsMessage: (base) => ({
    ...base,
    color: isDarkMode ? "#aaa" : "#999",
    padding: "10px 15px",
  }),
});

const ChainSelector = ({ network, setNetwork, darkMode = true, className = "" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const customStyles = getCustomStyles(darkMode);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkIfMobile();

    // Add event listener
    window.addEventListener('resize', checkIfMobile);

    // Clean up
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // Format options with icons and names
  const options = Object.keys(NETWORKS).map((key) => ({
    value: key,
    label: (
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <div style={{ 
          width: "24px", 
          height: "24px", 
          display: "flex", 
          alignItems: "center", 
          justifyContent: "center",
          flexShrink: 0,
          overflow: "hidden",
          borderRadius: "50%",
          backgroundColor: darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.03)",
          padding: "2px"
        }}>
          <img 
            src={NETWORKS[key].icon} 
            alt={key} 
            width="20" 
            height="20" 
            style={{ 
              objectFit: "contain",
              transition: "transform 0.2s ease"
            }} 
          />
        </div>
        <span style={{ 
          fontWeight: "500", 
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis"
        }}>
          {NETWORKS[key].name}
        </span>
      </div>
    ),
    data: NETWORKS[key]
  }));

  // Format the selected network
  const selectedOption = options.find((opt) => opt.value === network);

  return (
    <div className={`chain-selector-container ${className}`} style={{
      position: "relative",
      width: isMobile ? "100%" : "220px",
      marginBottom: isMobile ? "10px" : 0
    }}>
      <Select
        options={options}
        value={selectedOption}
        onChange={(selected) => {
          setNetwork(selected.value);
          setIsOpen(false);
        }}
        styles={customStyles}
        isSearchable={true}
        placeholder="Select network..."
        menuIsOpen={isOpen}
        onMenuOpen={() => setIsOpen(true)}
        onMenuClose={() => setIsOpen(false)}
        classNamePrefix="chain-select"
        formatOptionLabel={(option) => (
          <div style={{ display: "flex", alignItems: "center" }}>
            {option.label}
          </div>
        )}
        components={{
          IndicatorSeparator: () => null
        }}
      />
      
      {selectedOption && (
        <div style={{ 
          position: "absolute", 
          right: "45px", 
          top: "50%", 
          transform: "translateY(-50%)", 
          display: isMobile ? "none" : "block",
          pointerEvents: "none"
        }}>
          <div style={{ 
            fontSize: "11px", 
            opacity: 0.6, 
            color: darkMode ? "#aaa" : "#666",
            backgroundColor: darkMode ? "rgba(0,0,0,0.2)" : "rgba(0,0,0,0.05)",
            padding: "2px 6px",
            borderRadius: "10px",
            whiteSpace: "nowrap"
          }}>
            {selectedOption.data?.chainId || ""}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChainSelector;