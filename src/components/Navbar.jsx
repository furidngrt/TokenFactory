"use client"

// Navbar.jsx dengan favicon
import { useState, useEffect } from "react"
import { Menu, Button, Icon, Transition } from "semantic-ui-react"
import NetworkSelector from "./NetworkSelector"
import { Link } from "react-router-dom"

const Navbar = ({ network, setNetwork, connectWallet, disconnectWallet, walletAddress, walletBalance }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [showWalletTooltip, setShowWalletTooltip] = useState(false)

  // Check if device is mobile and handle scroll events
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)
      if (!mobile) {
        setMobileMenuOpen(false)
      }
    }

    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("resize", handleResize)
    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  // Close menu when changing network
  const handleNetworkChange = (newNetwork) => {
    setNetwork(newNetwork)
    if (isMobile) {
      setMobileMenuOpen(false)
    }
  }

  // Close menu after wallet connection/disconnection
  const handleWalletConnect = async () => {
    await connectWallet()
    if (isMobile) {
      setMobileMenuOpen(false)
    }
  }

  const handleWalletDisconnect = () => {
    disconnectWallet()
    if (isMobile) {
      setMobileMenuOpen(false)
    }
  }

  // Copy wallet address to clipboard
  const copyWalletAddress = () => {
    if (walletAddress) {
      navigator.clipboard.writeText(walletAddress)
      setShowWalletTooltip(true)
      setTimeout(() => setShowWalletTooltip(false), 2000)
    }
  }

  return (
    <>
      <div className={`navbar-wrapper ${isScrolled ? "navbar-scrolled" : ""}`}>
        {/* Main Navbar */}
        <Menu secondary className="navbar-container">
          {/* Logo */}
          <Menu.Item header className="navbar-logo" as={Link} to="/">
            {/* Menggunakan favicon.svg dari direktori public */}
            <img
              src="/favicon.svg"
              alt="Token Factory Logo"
              style={{
                width: "24px",
                height: "24px",
                marginRight: "10px",
              }}
            />
            <span style={{ fontSize: "20px", fontWeight: "bold", color: "#023859" }}>Token Factory</span>
          </Menu.Item>

          {/* Monad Voting Link - Desktop */}
          {/* Navigation Links - Desktop */}
          {!isMobile && (
            <Menu.Menu className="desktop-nav-links">
              <Menu.Item as={Link} to="/about" className="nav-link">
                About
              </Menu.Item>
              <Menu.Item as={Link} to="/docs" className="nav-link">
                Docs
              </Menu.Item>
              <Menu.Item as={Link} to="/faq" className="nav-link">
                FAQ
              </Menu.Item>
              <Menu.Item
                as="a"
                href="http://daov.xyz/"
                target="_blank"
                rel="noopener noreferrer"
                className="nav-link external"
              >
                <span>Monad Voting</span>
                <Icon name="external" size="small" style={{ marginLeft: "4px", opacity: 0.7 }} />
              </Menu.Item>
            </Menu.Menu>
          )}

          {/* Desktop Navigation */}
          {!isMobile && (
            <Menu.Menu position="right" className="desktop-menu">
              <Menu.Item style={{ padding: "0 10px" }}>
                <NetworkSelector network={network} setNetwork={setNetwork} isMobile={false} />
              </Menu.Item>
              <Menu.Item style={{ padding: "0 0 0 10px" }}>
                {!walletAddress ? (
                  <Button
                    color="blue"
                    onClick={connectWallet}
                    style={{
                      borderRadius: "8px",
                      height: "40px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "0 16px",
                      zIndex: 1,
                      transition: "all 0.2s ease",
                      boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                    }}
                    className="connect-button"
                  >
                    <Icon name="plug" style={{ marginRight: "6px" }} />
                    Connect Wallet
                  </Button>
                ) : (
                  <div className="wallet-connected-container">
                    <div className="wallet-address-display" onClick={copyWalletAddress}>
                      <Icon name="ethereum" style={{ marginRight: "5px" }} />
                      {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
                      <Icon name="copy outline" size="small" style={{ marginLeft: "5px", opacity: 0.7 }} />
                      {/* Copy tooltip */}
                      <div className={`copy-tooltip ${showWalletTooltip ? "visible" : ""}`}>Address copied!</div>
                    </div>
                    <Button
                      color="grey"
                      onClick={disconnectWallet}
                      style={{
                        borderRadius: "8px",
                        height: "40px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "0 16px",
                        marginLeft: "10px",
                        zIndex: 1,
                      }}
                    >
                      <Icon name="sign-out" style={{ marginRight: "6px" }} />
                      Disconnect
                    </Button>
                  </div>
                )}
              </Menu.Item>
            </Menu.Menu>
          )}

          {/* Mobile Hamburger Icon */}
          {isMobile && (
            <Menu.Menu position="right">
              <Menu.Item onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                <Button
                  icon
                  basic
                  style={{
                    boxShadow: "none",
                    border: "none",
                    padding: "8px",
                    color: "#333",
                    backgroundColor: mobileMenuOpen ? "#f5f5f5" : "transparent",
                  }}
                >
                  <Icon name={mobileMenuOpen ? "close" : "bars"} size="large" />
                </Button>
              </Menu.Item>
            </Menu.Menu>
          )}
        </Menu>

        {/* Mobile Menu Drawer */}
        {isMobile && (
          <Transition visible={mobileMenuOpen} animation="slide down" duration={300}>
            <div className="mobile-menu-drawer">
              {/* Navigation Links - Mobile */}
              <div className="drawer-section">
                <div className="drawer-section-label">Navigation</div>
                <div className="drawer-section-content mobile-nav-links">
                  <Link to="/" className="mobile-link-item" onClick={() => setMobileMenuOpen(false)}>
                    <Icon name="home" style={{ marginRight: "6px" }} />
                    Home
                  </Link>
                  <Link to="/about" className="mobile-link-item" onClick={() => setMobileMenuOpen(false)}>
                    <Icon name="info circle" style={{ marginRight: "6px" }} />
                    About
                  </Link>
                  <Link to="/docs" className="mobile-link-item" onClick={() => setMobileMenuOpen(false)}>
                    <Icon name="file alternate" style={{ marginRight: "6px" }} />
                    Documentation
                  </Link>
                  <Link to="/faq" className="mobile-link-item" onClick={() => setMobileMenuOpen(false)}>
                    <Icon name="question circle" style={{ marginRight: "6px" }} />
                    FAQ
                  </Link>
                </div>
              </div>

              {/* External Links - Mobile */}
              <div className="drawer-section">
                <div className="drawer-section-label">External Links</div>
                <div className="drawer-section-content">
                  <a href="http://daov.xyz/" target="_blank" rel="noopener noreferrer" className="mobile-link-item">
                    <Icon name="external" style={{ marginRight: "6px" }} />
                    Monad Voting
                  </a>
                </div>
              </div>

              <div className="drawer-section">
                <div className="drawer-section-label">Select Network</div>
                <div className="drawer-section-content network-selector-container">
                  <NetworkSelector network={network} setNetwork={handleNetworkChange} isMobile={true} />
                </div>
              </div>

              <div className="drawer-section">
                <div className="drawer-section-label">Wallet</div>
                <div className="drawer-section-content wallet-container">
                  {!walletAddress ? (
                    <Button
                      color="blue"
                      fluid
                      onClick={handleWalletConnect}
                      style={{
                        borderRadius: "8px",
                        height: "42px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "14px",
                      }}
                    >
                      <Icon name="plug" style={{ marginRight: "6px" }} />
                      Connect Wallet
                    </Button>
                  ) : (
                    <div>
                      <div
                        className="wallet-address-display"
                        onClick={copyWalletAddress}
                        style={{ position: "relative" }}
                      >
                        <Icon name="ethereum" style={{ marginRight: "5px" }} />
                        {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
                        <Icon name="copy outline" size="small" style={{ marginLeft: "5px", opacity: 0.7 }} />
                        {walletBalance && <span className="wallet-balance">{walletBalance} ETH</span>}
                        {/* Copy tooltip */}
                        <div className={`copy-tooltip ${showWalletTooltip ? "visible" : ""}`}>Address copied!</div>
                      </div>
                      <Button
                        color="grey"
                        fluid
                        onClick={handleWalletDisconnect}
                        style={{
                          borderRadius: "8px",
                          height: "38px",
                          marginTop: "10px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "14px",
                        }}
                      >
                        <Icon name="sign-out" style={{ marginRight: "6px" }} />
                        Disconnect
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Transition>
        )}

        {/* Divider Line */}
        <div className="navbar-divider"></div>
      </div>

      {/* Add spacer div to prevent content jump when navbar becomes fixed */}
      <div className="navbar-spacer"></div>

      <style>{`
        /* Global Navbar Styles */
        .navbar-wrapper {
          background-color: white;
          width: 100%;
          z-index: 999;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          box-shadow: 0 2px 10px rgba(0,0,0,0.05);
          transition: all 0.3s ease;
        }
        
        .navbar-scrolled {
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        }
        
        .navbar-container {
          padding: 15px 24px !important;
          margin: 0 !important;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: nowrap !important;
          transition: padding 0.3s ease;
        }
        
        .navbar-scrolled .navbar-container {
          padding: 10px 24px !important;
        }
        
        .navbar-logo {
          padding: 0 !important;
          margin: 0 !important;
          cursor: pointer;
          transition: transform 0.2s ease;
        }
        
        .navbar-logo:hover {
          transform: translateY(-2px);
        }
        
        .navbar-divider {
          height: 1px;
          background-color: rgba(0,0,0,0.05);
          margin: 0;
          width: 100%;
        }
        
        /* Spacer to prevent content jump */
        .navbar-spacer {
          height: 70px; /* Adjust height based on your navbar */
        }
        
        /* Desktop Menu */
        .desktop-menu {
          display: flex;
          align-items: center;
        }
        
        /* Desktop Nav Links */
        .desktop-nav-links {
          margin-left: 20px;
        }
        
        .nav-link {
          font-size: 15px !important;
          font-weight: 500 !important;
          color: #2c3e50 !important;
          transition: all 0.2s ease !important;
          padding: 8px 12px !important;
          border-radius: 6px;
        }
        
        .nav-link:hover {
          background-color: rgba(52, 152, 219, 0.1) !important;
          color: #3498db !important;
        }
        
        .nav-link.external {
          display: flex !important;
          align-items: center !important;
        }
        
        /* Wallet Connected Container */
        .wallet-connected-container {
          display: flex;
          align-items: center;
        }
        
        .wallet-address-display {
          background-color: #f8f9fa;
          padding: 8px 12px;
          border-radius: 8px;
          font-size: 14px;
          color: #2c3e50;
          font-weight: 500;
          display: flex;
          align-items: center;
          cursor: pointer;
          transition: all 0.2s ease;
          position: relative;
        }
        
        .wallet-address-display:hover {
          background-color: #eef2f7;
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
          white-space: nowrap;
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
        
        /* Connect Button Animation */
        .connect-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0,0,0,0.15);
        }
        
        /* Mobile Menu Styles */
        .mobile-menu-drawer {
          background-color: white;
          padding: 15px;
          box-shadow: 0 5px 10px rgba(0,0,0,0.05);
          border-top: 1px solid #f0f0f0;
        }
        
        .drawer-section {
          margin-bottom: 15px;
        }
        
        .drawer-section:last-child {
          margin-bottom: 5px;
        }
        
        .drawer-section-label {
          font-size: 13px;
          color: #7f8c8d;
          margin-bottom: 8px;
          font-weight: 600;
        }
        
        .drawer-section-content {
          width: 100%;
        }
        
        .mobile-nav-links {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 8px;
        }
        
        .mobile-link-item {
          display: flex;
          align-items: center;
          padding: 10px 12px;
          background-color: #f8f9fa;
          border-radius: 8px;
          color: #2c3e50;
          font-weight: 500;
          font-size: 14px;
          text-decoration: none;
          transition: all 0.2s ease;
        }
        
        .mobile-link-item:hover {
          background-color: #eef2f7;
          color: #3498db;
        }
        
        .network-selector-container {
          margin-bottom: 5px;
        }
        
        .wallet-container {
          width: 100%;
        }
        
        .wallet-balance {
          background-color: #ebf5fb;
          padding: 3px 8px;
          border-radius: 12px;
          font-size: 12px;
          color: #3498db;
          margin-left: auto;
        }
        
        /* Responsive adjustments */
        @media (max-width: 767px) {
          .navbar-container {
            padding: 15px !important;
          }
          
          .navbar-scrolled .navbar-container {
            padding: 10px 15px !important;
          }
          
          .navbar-spacer {
            height: 62px; /* Slightly smaller for mobile */
          }
          
          .mobile-nav-links {
            grid-template-columns: 1fr;
          }
        }
        
        @media (min-width: 768px) and (max-width: 991px) {
          .nav-link {
            padding: 8px 8px !important;
            font-size: 14px !important;
          }
        }
      `}</style>
    </>
  )
}

export default Navbar

