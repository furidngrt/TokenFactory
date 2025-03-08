import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaXTwitter, FaGithub, FaTelegram, FaRocket, FaHeart, FaLink, FaCopy } from "react-icons/fa6";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [copyTooltip, setCopyTooltip] = useState(false);
  
  const handleCopyAddress = () => {
    navigator.clipboard.writeText("0x010A565eD3F310586dd79cf4a4CE918E1Af73cdA");
    setCopyTooltip(true);
    setTimeout(() => setCopyTooltip(false), 2000);
  };
  
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-main">
          {/* Brand Section */}
          <div className="footer-brand">
            <div className="footer-logo">
              <FaRocket className="footer-logo-icon" />
              <span className="footer-logo-text">Token Factory</span>
            </div>
            <p className="footer-tagline">Create custom tokens with ease on multiple blockchains</p>
            <div className="footer-social">
              <a href="https://twitter.com/0xtokenfactory" target="_blank" rel="noopener noreferrer" className="social-icon-link" aria-label="Twitter">
                <FaXTwitter />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="social-icon-link" aria-label="GitHub">
                <FaGithub />
              </a>
              <a href="https://t.me" target="_blank" rel="noopener noreferrer" className="social-icon-link" aria-label="Telegram">
                <FaTelegram />
              </a>
            </div>
          </div>
          
          {/* Links Sections */}
          <div className="footer-links-section">
            <div className="footer-links-column">
              <h3 className="footer-links-title">Resources</h3>
              <ul className="footer-links-list">
                <li><Link to="/docs" className="footer-link">Documentation</Link></li>
                <li><Link to="/faq" className="footer-link">FAQ</Link></li>
              </ul>
            </div>
            
            <div className="footer-links-column">
              <h3 className="footer-links-title">Contact</h3>
              <ul className="footer-links-list">
                <li><a href="mailto:info@tokenfactory.com" className="footer-link">Email Us</a></li>
                <li><a href="https://t.me/tokenfactorysupport" target="_blank" rel="noopener noreferrer" className="footer-link">Telegram Support</a></li>
              </ul>
              
              <div className="footer-donation">
                <h3 className="footer-links-title">Support Us</h3>
                <div className="donation-address" onClick={handleCopyAddress}>
                  <span className="address-text">0x010A...3cdA</span>
                  <FaCopy className="copy-icon" />
                  <div className={`copy-tooltip ${copyTooltip ? 'visible' : ''}`}>
                    Copied!
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="footer-bottom">
          <div className="footer-copyright">
            © {currentYear} Token Factory. All rights reserved.
          </div>
          <div className="footer-legal-links">
            <Link to="/terms" className="legal-link">Terms of Service</Link>
            <Link to="/privacy" className="legal-link">Privacy Policy</Link>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .footer-container {
          background: linear-gradient(to right, #f8f9fa, #f1f3f5);
          border-top: 1px solid rgba(0,0,0,0.05);
          padding-top: 50px;
          color: #495057;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', sans-serif;
        }
        
        .footer-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }
        
        .footer-main {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          gap: 40px;
          margin-bottom: 40px;
        }
        
        /* Brand Section */
        .footer-brand {
          flex: 1;
          min-width: 250px;
          max-width: 350px;
        }
        
        .footer-logo {
          display: flex;
          align-items: center;
          margin-bottom: 15px;
        }
        
        .footer-logo-icon {
          color: #e74c3c;
          margin-right: 10px;
          font-size: 24px;
        }
        
        .footer-logo-text {
          font-size: 22px;
          font-weight: 700;
          color: #2c3e50;
          letter-spacing: 0.5px;
        }
        
        .footer-tagline {
          color: #6c757d;
          font-size: 14px;
          line-height: 1.5;
          margin-bottom: 20px;
        }
        
        .footer-social {
          display: flex;
          gap: 15px;
        }
        
        .social-icon-link {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background-color: rgba(52, 152, 219, 0.1);
          color: #3498db;
          font-size: 16px;
          transition: all 0.2s ease;
        }
        
        .social-icon-link:hover {
          background-color: #3498db;
          color: white;
          transform: translateY(-3px);
          box-shadow: 0 5px 15px rgba(52, 152, 219, 0.2);
        }
        
        /* Links Section */
        .footer-links-section {
          display: flex;
          flex-wrap: wrap;
          gap: 40px;
        }
        
        .footer-links-column {
          min-width: 160px;
        }
        
        .footer-links-title {
          color: #2c3e50;
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 15px;
          position: relative;
        }
        
        .footer-links-title:after {
          content: '';
          position: absolute;
          left: 0;
          bottom: -5px;
          width: 30px;
          height: 2px;
          background-color: #3498db;
        }
        
        .footer-links-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        
        .footer-links-list li {
          margin-bottom: 10px;
        }
        
        .footer-link {
          color: #6c757d;
          text-decoration: none;
          transition: all 0.2s ease;
          font-size: 14px;
          display: inline-block;
        }
        
        .footer-link:hover {
          color: #3498db;
          transform: translateX(3px);
        }
        
        /* Donation Section */
        .footer-donation {
          margin-top: 25px;
        }
        
        .donation-address {
          display: flex;
          align-items: center;
          background-color: rgba(52, 152, 219, 0.1);
          padding: 8px 12px;
          border-radius: 6px;
          cursor: pointer;
          position: relative;
          transition: all 0.2s ease;
        }
        
        .donation-address:hover {
          background-color: rgba(52, 152, 219, 0.15);
        }
        
        .address-text {
          font-family: monospace;
          font-size: 13px;
          color: #3498db;
          margin-right: 8px;
        }
        
        .copy-icon {
          color: #6c757d;
          font-size: 14px;
        }
        
        .copy-tooltip {
          position: absolute;
          top: -30px;
          left: 50%;
          transform: translateX(-50%);
          background-color: #2c3e50;
          color: white;
          padding: 5px 10px;
          border-radius: 4px;
          font-size: 12px;
          opacity: 0;
          visibility: hidden;
          transition: all 0.2s ease;
        }
        
        .copy-tooltip:after {
          content: '';
          position: absolute;
          top: 100%;
          left: 50%;
          margin-left: -5px;
          border-width: 5px;
          border-style: solid;
          border-color: #2c3e50 transparent transparent transparent;
        }
        
        .copy-tooltip.visible {
          opacity: 1;
          visibility: visible;
        }
        
        /* Footer Bottom */
        .footer-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 0;
          border-top: 1px solid rgba(0,0,0,0.05);
          flex-wrap: wrap;
          gap: 15px;
        }
        
        .footer-copyright {
          color: #6c757d;
          font-size: 13px;
        }
        
        .footer-legal-links {
          display: flex;
          gap: 20px;
        }
        
        .legal-link {
          color: #6c757d;
          text-decoration: none;
          font-size: 13px;
          transition: color 0.2s ease;
        }
        
        .legal-link:hover {
          color: #3498db;
        }
        
        /* Responsive Design */
        @media (max-width: 768px) {
          .footer-main {
            flex-direction: column;
            gap: 30px;
          }
          
          .footer-brand {
            max-width: 100%;
            text-align: center;
          }
          
          .footer-logo {
            justify-content: center;
          }
          
          .footer-social {
            justify-content: center;
          }
          
          .footer-links-section {
            width: 100%;
            justify-content: space-around;
            gap: 30px;
          }
          
          .footer-links-title:after {
            left: 50%;
            transform: translateX(-50%);
          }
          
          .footer-links-column {
            text-align: center;
          }
          
          .footer-bottom {
            flex-direction: column;
            text-align: center;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;