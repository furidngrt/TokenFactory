import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Docs = () => {
  const [activeSection, setActiveSection] = useState('about');
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

      // Check screen size on mount and when window resizes
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    // Track scroll position to update active section
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      
      // Get all section elements
      const sections = ['getting-started', 'building', 'technical', 'tools', 'status']
        .map(id => document.getElementById(id))
        .filter(element => element !== null);
      
      // Find the current section
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        const sectionTop = section.offsetTop;
        
        if (scrollPosition >= sectionTop - 100) {
          setActiveSection(section.id);
          break;
        }
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('resize', checkScreenSize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Function to handle navigation clicks
  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    
    // Close sidebar on mobile after clicking a link
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  // Enhanced color palette with more vibrant accents
  const colors = {
    background: '#f8fafc',
    sidebarBackground: '#ffffff',
    headerBackground: '#e6eef7',
    textPrimary: '#1e293b',
    textSecondary: '#475569',
    borderColor: '#e2e8f0',
    hoverColor: '#f1f5f9',
    activeColor: '#dbeafe',
    accentBlue: '#3b82f6',
    accentLight: '#bfdbfe',
    cardShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
  };

  // Improved Inline styles with better responsive design
  const styles = {
    container: {
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      minHeight: '100vh',
      backgroundColor: colors.background,
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif',
      position: 'relative',
      overflow: 'hidden', // Prevent horizontal scrolling on mobile
      width: '100%',
    },
    sidebarToggle: {
      display: isMobile ? 'flex' : 'none',
      position: 'fixed',
      top: '16px',
      right: '16px',
      zIndex: 1000,
      width: '40px',
      height: '40px',
      borderRadius: '8px',
      backgroundColor: colors.accentBlue,
      color: 'white',
      border: 'none',
      justifyContent: 'center',
      alignItems: 'center',
      cursor: 'pointer',
      boxShadow: '0 2px 6px rgba(0, 0, 0, 0.15)',
      fontSize: '20px',
      transition: 'all 0.2s ease',
      WebkitTapHighlightColor: 'transparent',
    },
    sidebar: {
      width: isMobile ? '85%' : '280px',
      backgroundColor: colors.sidebarBackground,
      borderRight: `1px solid ${colors.borderColor}`,
      overflow: 'auto',
      position: isMobile ? 'fixed' : 'sticky',
      top: 0,
      bottom: 0,
      left: 0,
      zIndex: 100,
      transition: 'transform 0.3s ease',
      transform: isMobile && !sidebarOpen ? 'translateX(-100%)' : 'translateX(0)',
      maxHeight: '100vh',
      boxShadow: isMobile ? '2px 0 8px rgba(0, 0, 0, 0.1)' : 'none',
    },
    sidebarOverlay: {
      display: isMobile && sidebarOpen ? 'block' : 'none',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      zIndex: 90,
    },
    content: {
      flex: 1,
      padding: isMobile ? '16px 20px 80px' : '40px 80px',
      overflowX: 'hidden',
      marginLeft: isMobile ? 0 : '0',
      maxWidth: isMobile ? '100%' : '1200px',
      margin: '0 auto',
      width: isMobile ? '100%' : 'auto',
    },
    navContainer: {
      padding: '0 0 20px',
    },
    navHeader: {
      backgroundColor: colors.accentBlue,
      padding: '24px 20px',
      borderBottom: `1px solid ${colors.borderColor}`,
    },
    navHeaderText: {
      margin: 0,
      fontSize: '20px',
      fontWeight: '600',
      color: 'white',
    },
    backToHome: {
      display: 'flex',
      alignItems: 'center',
      padding: '16px 20px',
      color: colors.textSecondary,
      textDecoration: 'none',
      borderBottom: `1px solid ${colors.borderColor}`,
      fontSize: '14px',
      fontWeight: '500',
      transition: 'all 0.2s ease',
    },
    backIcon: {
      marginRight: '8px',
    },
    navItem: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '16px 20px',
      borderBottom: `1px solid ${colors.borderColor}`,
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      color: colors.textSecondary,
      fontWeight: '500',
    },
    activeNavItem: {
      backgroundColor: colors.activeColor,
      borderLeft: `4px solid ${colors.accentBlue}`,
      paddingLeft: '16px',
      color: colors.accentBlue,
      fontWeight: '600',
    },
    arrow: {
      fontSize: '16px',
      transition: 'transform 0.2s',
    },
    sectionHeader: {
      fontSize: isMobile ? '20px' : '30px',
      fontWeight: '700',
      marginBottom: isMobile ? '16px' : '24px',
      color: colors.textPrimary,
      paddingBottom: isMobile ? '12px' : '16px',
      borderBottom: `2px solid ${colors.accentLight}`,
      wordWrap: 'break-word',
    },
    paragraph: {
      lineHeight: '1.6',
      fontSize: isMobile ? '14px' : '16px',
      color: colors.textSecondary,
      marginBottom: isMobile ? '16px' : '20px',
      wordWrap: 'break-word',
    },
    section: {
      marginBottom: isMobile ? '24px' : '40px',
      backgroundColor: '#fff',
      padding: isMobile ? '20px 16px' : '32px',
      borderRadius: isMobile ? '8px' : '12px',
      boxShadow: colors.cardShadow,
      border: `1px solid ${colors.borderColor}`,
      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      width: '100%',
    },
    subsectionHeader: {
      fontSize: isMobile ? '18px' : '22px',
      fontWeight: '600',
      marginTop: '28px',
      marginBottom: '16px',
      color: colors.textPrimary,
      position: 'relative',
      paddingLeft: '16px',
      borderLeft: `3px solid ${colors.accentBlue}`,
    },
    list: {
      lineHeight: isMobile ? '1.6' : '1.8',
      marginBottom: isMobile ? '16px' : '24px',
      paddingLeft: isMobile ? '20px' : '24px',
      color: colors.textSecondary,
      fontSize: isMobile ? '14px' : 'inherit',
    },
    listItem: {
      marginBottom: isMobile ? '8px' : '12px',
      position: 'relative',
      wordWrap: 'break-word',
    },
    banner: {
      backgroundImage: 'linear-gradient(120deg, #3b82f6, #60a5fa)',
      padding: isMobile ? '20px 16px' : '40px',
      borderRadius: isMobile ? '8px' : '12px',
      marginBottom: isMobile ? '24px' : '32px',
      boxShadow: '0 10px 15px -3px rgba(59, 130, 246, 0.3)',
      position: 'relative',
      overflow: 'hidden',
      width: isMobile ? 'calc(100% - 8px)' : '100%',
      marginLeft: isMobile ? '4px' : '0',
      marginRight: isMobile ? '4px' : '0',
    },
    bannerOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      backgroundImage: 'radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.3) 0%, transparent 40%)',
    },
    bannerTitle: {
      fontSize: isMobile ? '22px' : '36px',
      fontWeight: '800',
      color: 'white',
      marginBottom: isMobile ? '12px' : '16px',
      position: 'relative',
      lineHeight: isMobile ? '1.3' : '1.4',
    },
    bannerText: {
      fontSize: isMobile ? '15px' : '18px',
      lineHeight: isMobile ? '1.5' : '1.7',
      color: 'rgba(255, 255, 255, 0.9)',
      position: 'relative',
      maxWidth: '800px',
    },
    mobileContentPadding: {
      paddingTop: isMobile ? '60px' : '0',
    },
    codeBlock: {
      fontFamily: 'monospace',
      wordBreak: 'break-all',
      padding: isMobile ? '3px 4px' : '4px 6px',
      backgroundColor: '#f1f5f9',
      borderRadius: '4px',
      fontSize: isMobile ? '12px' : '14px',
      color: '#334155',
      display: 'inline-block',
      maxWidth: '100%',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    statusBadge: {
      display: 'inline-block',
      padding: '4px 8px',
      borderRadius: '4px',
      fontSize: '12px',
      fontWeight: '600',
      marginLeft: '8px',
      backgroundColor: colors.accentLight,
      color: colors.accentBlue,
    },
    tableContainer: {
      overflowX: 'auto',
      marginBottom: isMobile ? '20px' : '24px',
      width: '100%',
      maxWidth: '100%',
      WebkitOverflowScrolling: 'touch',
    },
    table: {
      width: '100%',
      borderCollapse: 'separate',
      borderSpacing: '0',
      border: `1px solid ${colors.borderColor}`,
      borderRadius: '8px',
      overflow: 'hidden',
    },
    tableHeader: {
      backgroundColor: colors.headerBackground,
      color: colors.textPrimary,
      padding: isMobile ? '10px 12px' : '12px 16px',
      textAlign: 'left',
      fontWeight: '600',
      borderBottom: `1px solid ${colors.borderColor}`,
      fontSize: isMobile ? '13px' : 'inherit',
      whiteSpace: isMobile ? 'nowrap' : 'normal',
    },
    tableCell: {
      padding: isMobile ? '8px 12px' : '12px 16px',
      borderBottom: `1px solid ${colors.borderColor}`,
      color: colors.textSecondary,
      fontSize: isMobile ? '13px' : 'inherit',
      wordBreak: 'break-word',
    },
    gridContainer: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
      gap: isMobile ? '16px' : '24px',
      marginBottom: isMobile ? '24px' : '32px',
      width: '100%',
    },
    gridItem: {
      backgroundColor: '#fff',
      padding: '24px',
      borderRadius: '8px',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      border: `1px solid ${colors.borderColor}`,
    },
    tooltipContainer: {
      position: 'relative',
      display: 'inline-block',
      borderBottom: '1px dotted #64748b',
      cursor: 'help',
    },
    floatingActionButton: {
      position: 'fixed',
      bottom: isMobile ? '16px' : '24px',
      right: isMobile ? '16px' : '24px',
      width: isMobile ? '48px' : '56px',
      height: isMobile ? '48px' : '56px',
      borderRadius: '50%',
      backgroundColor: colors.accentBlue,
      color: 'white',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
      cursor: 'pointer',
      zIndex: 50,
      fontSize: isMobile ? '20px' : '24px',
      border: 'none',
      WebkitTapHighlightColor: 'transparent', // Remove tap highlight on mobile
    }
  };

  return (
    <div style={styles.container}>
      {/* Mobile sidebar toggle button */}
      <div 
        style={styles.sidebarToggle} 
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? '✕' : '☰'}
      </div>
      
      {/* Mobile sidebar overlay */}
      {isMobile && (
        <div 
          style={styles.sidebarOverlay} 
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Back to home link for mobile */}
      {isMobile && !sidebarOpen && (
        <Link 
          to="/" 
          style={{
            position: 'fixed',
            top: '16px',
            left: '16px',
            padding: '6px 12px',
            backgroundColor: 'white',
            color: colors.accentBlue,
            borderRadius: '8px',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            zIndex: 99,
            fontSize: '14px',
            fontWeight: '500',
            WebkitTapHighlightColor: 'transparent', // Remove tap highlight on mobile
          }}
        >
          <span style={{marginRight: '5px', fontSize: '16px'}}>←</span> Home
        </Link>
      )}
      
      {/* Sidebar Navigation */}
      <div style={styles.sidebar}>
        <div style={styles.navHeader}>
          <h2 style={styles.navHeaderText}>Token Factory</h2>
        </div>
        
        <Link to="/" style={styles.backToHome}>
          <span style={styles.backIcon}>←</span> Back to Home
        </Link>
        
        <div style={styles.navContainer}>
          <div 
            style={activeSection === 'getting-started' ? 
              {...styles.navItem, ...styles.activeNavItem} : 
              styles.navItem} 
            onClick={() => scrollToSection('getting-started')}
          >
            <span>Getting Started</span>
            <span style={styles.arrow}>›</span>
          </div>
          
          <div 
            style={activeSection === 'building' ? 
              {...styles.navItem, ...styles.activeNavItem} : 
              styles.navItem}
            onClick={() => scrollToSection('building')}
          >
            <span>Building on Token Factory</span>
            <span style={styles.arrow}>›</span>
          </div>
          
          <div 
            style={activeSection === 'technical' ? 
              {...styles.navItem, ...styles.activeNavItem} : 
              styles.navItem}
            onClick={() => scrollToSection('technical')}
          >
            <span>Technical Information</span>
            <span style={styles.arrow}>›</span>
          </div>
          
          <div 
            style={activeSection === 'tools' ? 
              {...styles.navItem, ...styles.activeNavItem} : 
              styles.navItem}
            onClick={() => scrollToSection('tools')}
          >
            <span>Tools</span>
            <span style={styles.arrow}>›</span>
          </div>
          
          <div 
            style={activeSection === 'status' ? 
              {...styles.navItem, ...styles.activeNavItem} : 
              styles.navItem}
            onClick={() => scrollToSection('status')}
          >
            <span>Status Updates</span>
            <span style={styles.arrow}>›</span>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div style={{...styles.content, ...styles.mobileContentPadding}}>
        <div className="header-container" style={{paddingTop: isMobile ? '6px' : '0'}}>
          <div style={styles.banner}>
            <div style={styles.bannerOverlay}></div>
            <h1 style={styles.bannerTitle}>Token Factory Documentation</h1>
            <p style={styles.bannerText}>
              Token Factory is a multi-chain token deployment platform that enables users to create and manage tokens 
              across various blockchain networks with a unified interface.
            </p>
          </div>
        </div>
        
        <div id="getting-started" style={styles.section}>
          <h2 style={styles.sectionHeader}>Getting Started</h2>
          <p style={styles.paragraph}>
            Getting started with Token Factory is straightforward. You'll need a compatible wallet and some funds to cover the deployment costs on your chosen blockchain.
          </p>
          
          <div style={styles.gridContainer}>
            <div style={styles.gridItem}>
              <h3 style={styles.subsectionHeader}>Prerequisites</h3>
              <ul style={styles.list}>
                <li style={styles.listItem}>A compatible wallet (Metamask, Wallet Connect, etc.)</li>
                <li style={styles.listItem}>Funds in your wallet for the target blockchain to cover deployment costs</li>
                <li style={styles.listItem}>Basic understanding of token parameters</li>
              </ul>
            </div>
            
            <div style={styles.gridItem}>
              <h3 style={styles.subsectionHeader}>Connecting Your Wallet</h3>
              <ol style={styles.list}>
                <li style={styles.listItem}>Navigate to the Token Factory application</li>
                <li style={styles.listItem}>Click on the wallet button in the top-right corner</li>
                <li style={styles.listItem}>Select your preferred wallet provider</li>
                <li style={styles.listItem}>Follow the wallet connection prompts</li>
              </ol>
            </div>
          </div>
          
          <div style={styles.tableContainer}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.tableHeader}>Feature</th>
                  <th style={styles.tableHeader}>Description</th>
                  <th style={styles.tableHeader}>Availability</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={styles.tableCell}>Basic Token Creation</td>
                  <td style={styles.tableCell}>Create standard ERC-20 tokens with custom parameters</td>
                  <td style={styles.tableCell}>All Networks</td>
                </tr>
                <tr>
                  <td style={styles.tableCell}>Advanced Token Features</td>
                  <td style={styles.tableCell}>Mintable, burnable, and pausable functionality</td>
                  <td style={styles.tableCell}>All Networks</td>
                </tr>
                <tr>
                  <td style={styles.tableCell}>Token Management</td>
                  <td style={styles.tableCell}>Modify permissions and token features after deployment</td>
                  <td style={styles.tableCell}>Selected Networks</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <div id="building" style={styles.section}>
          <h2 style={styles.sectionHeader}>Building on Token Factory</h2>
          <p style={styles.paragraph}>
            Token Factory provides a simple interface for creating tokens, but also offers powerful features for developers looking to build on top of the platform.
          </p>
          
          <h3 style={styles.subsectionHeader}>Creating Your First Token</h3>
          <ol style={styles.list}>
            <li style={styles.listItem}>Select your desired blockchain network</li>
            <li style={styles.listItem}>Enter a token name (e.g., "Liberty Token")</li>
            <li style={styles.listItem}>Create a token symbol (e.g., "LTN")</li>
            <li style={styles.listItem}>Set the total supply for your token</li>
            <li style={styles.listItem}>Confirm the transaction in your wallet</li>
          </ol>
          
          <h3 style={styles.subsectionHeader}>Advanced Features</h3>
          <p style={styles.paragraph}>
            Token Factory supports a range of advanced features for token creation:
          </p>
          
          <div style={styles.gridContainer}>
            <div style={styles.gridItem}>
              <h4 style={{fontSize: '18px', fontWeight: '600', marginBottom: '12px', color: colors.textPrimary}}>
                Token Properties
              </h4>
              <ul style={styles.list}>
                <li style={styles.listItem}>Mintable: Allow new tokens to be created after initial distribution</li>
                <li style={styles.listItem}>Burnable: Allow tokens to be permanently removed from circulation</li>
                <li style={styles.listItem}>Pausable: Temporarily freeze all token transfers if needed</li>
              </ul>
            </div>
            
            <div style={styles.gridItem}>
              <h4 style={{fontSize: '18px', fontWeight: '600', marginBottom: '12px', color: colors.textPrimary}}>
                Access Controls
              </h4>
              <ul style={styles.list}>
                <li style={styles.listItem}>Role-based permissions for administrative functions</li>
                <li style={styles.listItem}>Time-locked operations for major token changes</li>
                <li style={styles.listItem}>Multi-signature support for enhanced security</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div id="technical" style={styles.section}>
          <h2 style={styles.sectionHeader}>Technical Information</h2>
          <p style={styles.paragraph}>
            Token Factory uses standardized ERC-20 token contracts across all supported networks, with factory contract addresses specific to each blockchain.
          </p>
          
          <h3 style={styles.subsectionHeader}>Supported Networks</h3>
          <div style={styles.tableContainer}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.tableHeader}>Network</th>
                  <th style={styles.tableHeader}>Factory Address</th>
                  <th style={styles.tableHeader}>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={styles.tableCell}>Berachain</td>
                  <td style={styles.tableCell}><span style={styles.codeBlock}>0xdaAe77edcB0D2802Df1326d5eC5b2778A32a9f4E</span></td>
                  <td style={styles.tableCell}><span style={styles.statusBadge}>Active</span></td>
                </tr>
                <tr>
                  <td style={styles.tableCell}>Soneium</td>
                  <td style={styles.tableCell}><span style={styles.codeBlock}>0x662B14a3579A05D025209fFfB9840117a149D67e</span></td>
                  <td style={styles.tableCell}><span style={styles.statusBadge}>Active</span></td>
                </tr>
                <tr>
                  <td style={styles.tableCell}>Ink</td>
                  <td style={styles.tableCell}><span style={styles.codeBlock}>0x196caF32513aa0172Fa8d7add734B6EDB0b17de2</span></td>
                  <td style={styles.tableCell}><span style={styles.statusBadge}>Active</span></td>
                </tr>
                <tr>
                  <td style={styles.tableCell}>Unichain</td>
                  <td style={styles.tableCell}><span style={styles.codeBlock}>0x55577e04DAe968f6A1c06C6D74De834c294D2B3E</span></td>
                  <td style={styles.tableCell}><span style={styles.statusBadge}>Active</span></td>
                </tr>
                <tr>
                  <td style={styles.tableCell}>Linea</td>
                  <td style={styles.tableCell}><span style={styles.codeBlock}>0x382C4E2964C5507BF798838a7Bc0081aa8e50e0B</span></td>
                  <td style={styles.tableCell}><span style={styles.statusBadge}>Active</span></td>
                </tr>
                <tr>
                  <td style={styles.tableCell}>Monad Testnet</td>
                  <td style={styles.tableCell}><span style={styles.codeBlock}>0x3f6D80eB7518A4eB28c0Eb7d36c9Fa9B7b1b5b8F</span></td>
                  <td style={styles.tableCell}><span style={{...styles.statusBadge, backgroundColor: '#fef3c7', color: '#d97706'}}>Testing</span></td>
                </tr>
                <tr>
                  <td style={styles.tableCell}>Story</td>
                  <td style={styles.tableCell}><span style={styles.codeBlock}>0xb2A5b690ed415Ba718F3aC33C0fd65c817EC41b4</span></td>
                  <td style={styles.tableCell}><span style={{...styles.statusBadge, backgroundColor: '#dcfce7', color: '#16a34a'}}>New</span></td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <h3 style={styles.subsectionHeader}>Gas Costs</h3>
          <p style={styles.paragraph}>
            Deployment costs vary by network and token complexity. Basic tokens typically require between 1-2M gas units.
          </p>
        </div>
        
        <div id="tools" style={styles.section}>
          <h2 style={styles.sectionHeader}>Tools</h2>
          <p style={styles.paragraph}>
            Token Factory provides several tools to help you manage and interact with your tokens after deployment.
          </p>
          
          <div style={styles.gridContainer}>
            <div style={styles.gridItem}>
              <h3 style={{...styles.subsectionHeader, marginTop: '0'}}>Token Explorer</h3>
              <p style={styles.paragraph}>
                View detailed information about your tokens including:
              </p>
              <ul style={styles.list}>
                <li style={styles.listItem}>Total supply and circulation</li>
                <li style={styles.listItem}>Holder distribution</li>
                <li style={styles.listItem}>Transaction history</li>
              </ul>
            </div>
            
            <div style={styles.gridItem}>
              <h3 style={{...styles.subsectionHeader, marginTop: '0'}}>Token Transfer</h3>
              <p style={styles.paragraph}>
                Easily transfer tokens to other addresses with:
              </p>
              <ul style={styles.list}>
                <li style={styles.listItem}>Batch transfer capabilities</li>
                <li style={styles.listItem}>Scheduled transfers</li>
                <li style={styles.listItem}>Transfer history tracking</li>
              </ul>
            </div>
          </div>
          
          <h3 style={styles.subsectionHeader}>Token Management</h3>
          <p style={styles.paragraph}>
            Comprehensive token management features:
          </p>
          <ul style={styles.list}>
            <li style={styles.listItem}>Update token metadata</li>
            <li style={styles.listItem}>Manage permissions and roles</li>
            <li style={styles.listItem}>Configure token properties and functionalities</li>
          </ul>
        </div>
        
        <div id="status" style={styles.section}>
          <h2 style={styles.sectionHeader}>Status Updates</h2>
          <p style={styles.paragraph}>
            Check here for the latest updates on Token Factory development and supported networks.
          </p>
          
          <h3 style={styles.subsectionHeader}>Recent Updates</h3>
          <div style={styles.tableContainer}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.tableHeader}>Date</th>
                  <th style={styles.tableHeader}>Update</th>
                  <th style={styles.tableHeader}>Details</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={styles.tableCell}>March 2025</td>
                  <td style={styles.tableCell}>Added Story blockchain support</td>
                  <td style={styles.tableCell}>Full integration with Story network, enabling token creation and management</td>
                </tr>
                <tr>
                  <td style={styles.tableCell}>February 2025</td>
                  <td style={styles.tableCell}>Integrated with Monad Testnet</td>
                  <td style={styles.tableCell}>Beta support for the upcoming Monad blockchain</td>
                </tr>
                <tr>
                  <td style={styles.tableCell}>January 2025</td>
                  <td style={styles.tableCell}>UI/UX improvements</td>
                  <td style={styles.tableCell}>Enhanced interface, mobile responsiveness, and workflow optimization</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <h3 style={styles.subsectionHeader}>Upcoming Features</h3>
          <ul style={styles.list}>
            <li style={styles.listItem}>Enhanced token analytics dashboard</li>
            <li style={styles.listItem}>Integration with additional blockchain networks</li>
            <li style={styles.listItem}>Advanced tokenomics configuration options</li>
          </ul>
        </div>
      </div>
      
      {/* Scroll to top button */}
      <button 
        style={styles.floatingActionButton}
        onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
      >
        ↑
      </button>
    </div>
  );
};

export default Docs;