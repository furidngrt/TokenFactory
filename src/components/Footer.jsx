import React from "react";
import { Link } from "react-router-dom";
import { FaXTwitter, FaGithub, FaTelegram } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer style={styles.footer}>
      {/* ✅ Ikon Sosial Media di atas */}
      <div style={styles.socialIcons}>
        <a href="https://twitter.com/youraccount" target="_blank" rel="noopener noreferrer" style={styles.icon}>
          <FaXTwitter size={18} />
        </a>
        <a href="https://github.com/yourrepo" target="_blank" rel="noopener noreferrer" style={styles.icon}>
          <FaGithub size={18} />
        </a>
        <a href="https://t.me/yourtelegram" target="_blank" rel="noopener noreferrer" style={styles.icon}>
          <FaTelegram size={18} />
        </a>
      </div>

      <div style={styles.container}>
        <span>© {new Date().getFullYear()} Token Factory</span>
        <span className="separator">|</span>
        <Link to="/about" style={styles.link}>About</Link>
        <span className="separator">|</span>
        <span>Donations:</span>
        <a 
          href="https://etherscan.io/address/0x010A565eD3F310586dd79cf4a4CE918E1Af73cdA" 
          target="_blank" 
          rel="noopener noreferrer" 
          style={styles.donationLink}
        >
          0x010A...3cdA
        </a>
        <span style={styles.heart}>❤️</span>
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    borderTop: "1px solid #ddd",
    padding: "15px 10px",
    backgroundColor: "#f9f9f9",
    fontSize: "14px",
    color: "#666",
    width: "100%",
    textAlign: "center",
    marginTop: "20px",
  },
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "10px",
  },
  socialIcons: {
    display: "flex",
    justifyContent: "center",
    gap: "12px",
    marginBottom: "8px",
  },
  icon: {
    color: "#333",
    textDecoration: "none",
    transition: "color 0.3s ease",
  },
  link: {
    color: "#007bff",
    textDecoration: "none",
    fontWeight: "bold",
  },
  donationLink: {
    color: "#007bff",
    textDecoration: "none",
    fontWeight: "normal",
  },
  heart: {
    opacity: 0.7,
    marginLeft: "5px",
  },
};

export default Footer;
