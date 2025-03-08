import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const FAQ = () => {
  const [activeQuestion, setActiveQuestion] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredFaqs, setFilteredFaqs] = useState([]);

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

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  // FAQ data with categories
  const faqData = [
    {
      category: "Getting Started",
      questions: [
        {
          id: "what-is-token-factory",
          question: "What is Token Factory?",
          answer: "Token Factory is a multi-chain token deployment platform that enables users to create and manage tokens across various blockchain networks with a unified interface. It simplifies the token creation process, removing the need for technical knowledge of smart contract development."
        },
        {
          id: "how-to-start",
          question: "How do I get started with Token Factory?",
          answer: "To get started with Token Factory, connect your wallet by clicking the 'Connect Wallet' button at the top of the page. Once connected, you can select your desired blockchain network, enter token details (name, symbol, supply), and deploy your token with a simple transaction confirmation."
        },
        {
          id: "supported-wallets",
          question: "Which wallets are supported?",
          answer: "Token Factory supports various web3 wallets including MetaMask, WalletConnect, Coinbase Wallet, Trust Wallet, and other Ethereum-compatible browser wallets. Any wallet that supports the networks available on Token Factory can be used."
        }
      ]
    },
    {
      category: "Token Creation",
      questions: [
        {
          id: "token-cost",
          question: "How much does it cost to create a token?",
          answer: "The cost to create a token varies depending on the blockchain network you choose and the current gas prices. Token creation typically requires a deployment fee (gas) paid in the native currency of the selected blockchain. Token Factory itself does not charge additional fees beyond network gas costs."
        },
        {
          id: "token-types",
          question: "What types of tokens can I create?",
          answer: "Token Factory allows you to create standard ERC-20 compatible tokens on all supported networks. You can configure various features including mintable, burnable, and pausable functionality depending on your needs. Custom token types or advanced functionality may require additional configuration."
        },
        {
          id: "edit-after-creation",
          question: "Can I edit my token after creation?",
          answer: "Some token properties can be modified after deployment if you've enabled those features during creation. For example, if you've created a mintable token, you can mint additional tokens later. However, fundamental properties like the token name and symbol cannot be changed after deployment due to the immutable nature of blockchain."
        }
      ]
    },
    {
      category: "Networks & Technical",
      questions: [
        {
          id: "supported-networks",
          question: "Which blockchain networks are supported?",
          answer: "Token Factory currently supports multiple networks including Berachain, Soneium, Ink, Unichain, Linea, Monad Testnet, and Story. We regularly add new networks based on community demand and technological advancements."
        },
        {
          id: "token-standard",
          question: "What token standard is used?",
          answer: "Token Factory uses the ERC-20 token standard for all supported networks, which is the most widely adopted token interface. This ensures compatibility with wallets, exchanges, and other blockchain applications across the ecosystem."
        },
        {
          id: "technical-requirements",
          question: "Are there any technical requirements?",
          answer: "You need a compatible web3 wallet with sufficient funds to cover the gas costs on your chosen network. No coding knowledge or technical expertise is required to create tokens through Token Factory's intuitive interface."
        }
      ]
    },
    {
      category: "Management & Support",
      questions: [
        {
          id: "manage-tokens",
          question: "How do I manage my tokens after creation?",
          answer: "After creating your token, you can manage it through the 'My Tokens' section of Token Factory. This allows you to view token details, transfer tokens, and perform administrative actions if your token includes features like minting or pausing capabilities."
        },
        {
          id: "token-listing",
          question: "Can Token Factory help list my token on exchanges?",
          answer: "Token Factory focuses on token creation and management. While we don't directly facilitate exchange listings, tokens created through our platform are standard-compliant and technically compatible with exchanges. The listing process would need to be pursued separately with each exchange."
        },
        {
          id: "support-contact",
          question: "How can I get support?",
          answer: "For support, you can reach out through our Discord community, submit a support ticket through the website, or check our documentation for self-service help. Our team is available to assist with technical issues related to token creation and management."
        }
      ]
    }
  ];

  // Effect to filter FAQs based on search term
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredFaqs(faqData);
      return;
    }
    
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    
    const filtered = faqData.map(category => {
      const filteredQuestions = category.questions.filter(
        q => q.question.toLowerCase().includes(lowerCaseSearchTerm) || 
             q.answer.toLowerCase().includes(lowerCaseSearchTerm)
      );
      
      return filteredQuestions.length > 0 ? 
        { ...category, questions: filteredQuestions } : 
        null;
    }).filter(Boolean);
    
    setFilteredFaqs(filtered);
  }, [searchTerm]);

  // Toggle question accordion
  const toggleQuestion = (id) => {
    setActiveQuestion(activeQuestion === id ? null : id);
  };

  // Enhanced color palette with more vibrant accents (matching the docs component)
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
      overflow: 'hidden',
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
    navItemHover: {
      backgroundColor: colors.hoverColor,
    },
    mobileContentPadding: {
      paddingTop: isMobile ? '60px' : '0',
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
    searchContainer: {
      margin: isMobile ? '0 0 20px' : '0 0 30px',
      position: 'relative',
    },
    searchInput: {
      width: '100%',
      padding: '14px 20px 14px 50px',
      fontSize: '16px',
      borderRadius: '8px',
      border: `1px solid ${colors.borderColor}`,
      backgroundColor: 'white',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
      outline: 'none',
      transition: 'all 0.2s',
    },
    searchIcon: {
      position: 'absolute',
      left: '16px',
      top: '50%',
      transform: 'translateY(-50%)',
      color: colors.textSecondary,
      fontSize: '20px',
    },
    faqContainer: {
      marginBottom: '30px',
    },
    categoryTitle: {
      fontSize: isMobile ? '20px' : '24px',
      fontWeight: '700',
      color: colors.textPrimary,
      marginBottom: '16px',
      paddingBottom: '8px',
      borderBottom: `2px solid ${colors.accentLight}`,
    },
    questionContainer: {
      marginBottom: '12px',
      borderRadius: '8px',
      overflow: 'hidden',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
      border: `1px solid ${colors.borderColor}`,
      backgroundColor: 'white',
    },
    questionHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: isMobile ? '14px 16px' : '16px 20px',
      cursor: 'pointer',
      backgroundColor: 'white',
      transition: 'background-color 0.2s',
    },
    questionHeaderActive: {
      backgroundColor: colors.hoverColor,
    },
    questionText: {
      margin: 0,
      fontSize: isMobile ? '15px' : '16px',
      fontWeight: '600',
      color: colors.textPrimary,
      flex: 1,
    },
    questionIcon: {
      fontSize: '18px',
      color: colors.accentBlue,
      transition: 'transform 0.3s',
    },
    questionIconActive: {
      transform: 'rotate(180deg)',
    },
    answerContainer: {
      maxHeight: '0',
      overflow: 'hidden',
      transition: 'max-height 0.3s ease-out',
      backgroundColor: colors.hoverColor,
    },
    answerContainerActive: {
      maxHeight: '500px',
      transition: 'max-height 0.5s ease-in',
    },
    answerText: {
      padding: '16px 20px',
      fontSize: isMobile ? '14px' : '16px',
      lineHeight: '1.6',
      color: colors.textSecondary,
      margin: 0,
      borderTop: `1px solid ${colors.borderColor}`,
    },
    emptySearchResult: {
      textAlign: 'center',
      padding: '40px 20px',
      color: colors.textSecondary,
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: colors.cardShadow,
    },
    emptySearchIcon: {
      fontSize: '48px',
      color: colors.accentLight,
      marginBottom: '16px',
    },
    emptySearchText: {
      fontSize: '18px',
      fontWeight: '600',
      marginBottom: '8px',
      color: colors.textPrimary,
    },
    emptySearchSubtext: {
      fontSize: '16px',
      marginBottom: '24px',
    },
    resetSearchButton: {
      backgroundColor: colors.accentBlue,
      color: 'white',
      border: 'none',
      padding: '10px 20px',
      borderRadius: '6px',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'all 0.2s',
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
      WebkitTapHighlightColor: 'transparent',
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
      <div 
        style={styles.sidebarOverlay} 
        onClick={() => setSidebarOpen(false)}
      />
      
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
            WebkitTapHighlightColor: 'transparent',
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
          <Link to="/docs" style={{textDecoration: 'none'}}>
            <div style={styles.navItem}>
              <span>Documentation</span>
              <span style={styles.arrow}>›</span>
            </div>
          </Link>
          
          <div style={{...styles.navItem, backgroundColor: colors.activeColor, borderLeft: `4px solid ${colors.accentBlue}`, paddingLeft: '16px', color: colors.accentBlue, fontWeight: '600'}}>
            <span>FAQ</span>
            <span style={styles.arrow}>›</span>
          </div>
          
          <Link to="/support" style={{textDecoration: 'none'}}>
            <div style={styles.navItem}>
              <span>Support</span>
              <span style={styles.arrow}>›</span>
            </div>
          </Link>
          
          <Link to="/community" style={{textDecoration: 'none'}}>
            <div style={styles.navItem}>
              <span>Community</span>
              <span style={styles.arrow}>›</span>
            </div>
          </Link>
          
          <Link to="/changelog" style={{textDecoration: 'none'}}>
            <div style={styles.navItem}>
              <span>Changelog</span>
              <span style={styles.arrow}>›</span>
            </div>
          </Link>
        </div>
      </div>
      
      {/* Main Content */}
      <div style={{...styles.content, ...styles.mobileContentPadding}}>
        <div className="header-container" style={{paddingTop: isMobile ? '6px' : '0'}}>
          <div style={styles.banner}>
            <div style={styles.bannerOverlay}></div>
            <h1 style={styles.bannerTitle}>Frequently Asked Questions</h1>
            <p style={styles.bannerText}>
              Find answers to common questions about Token Factory, token creation, and blockchain networks.
            </p>
          </div>
        </div>
        
        {/* Search Bar */}
        <div style={styles.searchContainer}>
          <span style={styles.searchIcon}>🔍</span>
          <input
            type="text"
            placeholder="Search FAQs..."
            style={styles.searchInput}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        {/* FAQ Content */}
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map((category, index) => (
            <div key={index} style={styles.faqContainer}>
              <h2 style={styles.categoryTitle}>{category.category}</h2>
              
              {category.questions.map((faq) => (
                <div key={faq.id} style={styles.questionContainer}>
                  <div 
                    style={{
                      ...styles.questionHeader,
                      ...(activeQuestion === faq.id ? styles.questionHeaderActive : {})
                    }}
                    onClick={() => toggleQuestion(faq.id)}
                  >
                    <h3 style={styles.questionText}>{faq.question}</h3>
                    <span 
                      style={{
                        ...styles.questionIcon,
                        ...(activeQuestion === faq.id ? styles.questionIconActive : {})
                      }}
                    >
                      ▼
                    </span>
                  </div>
                  
                  <div 
                    style={{
                      ...styles.answerContainer,
                      ...(activeQuestion === faq.id ? styles.answerContainerActive : {})
                    }}
                  >
                    <p style={styles.answerText}>{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          ))
        ) : (
          <div style={styles.emptySearchResult}>
            <div style={styles.emptySearchIcon}>🔍</div>
            <h3 style={styles.emptySearchText}>No results found</h3>
            <p style={styles.emptySearchSubtext}>
              We couldn't find any FAQs matching your search. Try different keywords or browse all questions.
            </p>
            <button 
              style={styles.resetSearchButton}
              onClick={() => setSearchTerm('')}
            >
              View All FAQs
            </button>
          </div>
        )}
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

export default FAQ;