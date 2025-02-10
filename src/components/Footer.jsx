import React from "react";

const Footer = () => {
  return (
    <footer style={{
      borderTop: "1px solid #ddd",
      padding: "15px",
      textAlign: "center",
      width: "100%",
      marginTop: "20px",
      backgroundColor: "#f8f9fa",
      fontSize: "14px",
      color: "#555",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    }}>
      {/* Link ke GitHub */}
      <p style={{ margin: "0 0 5px 0" }}>
        <a href="##" target="_blank" rel="noopener noreferrer" style={{ 
          textDecoration: "none", 
          color: "#007bff", 
          fontWeight: "bold", 
          display: "flex", 
          alignItems: "center", 
          gap: "6px"
        }}>
          <img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" alt="GitHub" style={{ width: "16px", height: "16px" }} />
          View Source Code on GitHub
        </a>
      </p>

      {/* Copyright & Donasi */}
      <p style={{ margin: "0", fontWeight: "500", display: "flex", alignItems: "center", gap: "6px" }}>
        Deployer © {new Date().getFullYear()} • Donations: 
        <a href="https://etherscan.io/address/0x010A3cdA..." target="_blank" rel="noopener noreferrer" style={{ color: "#007bff", textDecoration: "none", fontWeight: "bold" }}>
          0x010A...3cdA
        </a> 
        <span style={{ color: "red" }}>❤️</span>
      </p>
    </footer>
  );
};

export default Footer;
