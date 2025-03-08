import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Segment, Header, List, Icon, Button, Divider, Grid } from "semantic-ui-react";

const About = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.pageBackground}>
      <Container style={styles.container}>
        <Segment raised padded style={styles.segment}>
          {/* Title Section */}
          <Header as="h1" textAlign="center" style={styles.title}>
            <Icon name="rocket" size="large" style={styles.titleIcon} />
            <Header.Content>
              About Token Factory
              <Header.Subheader style={styles.titleSubheader}>
                Create your own tokens in minutes
              </Header.Subheader>
            </Header.Content>
          </Header>
          
          <Divider style={styles.divider} />

          {/* Introduction */}
          <p style={styles.paragraph}>
            Welcome to Token Factory, a platform that enables users to <span style={styles.highlight}>create and deploy custom tokens</span> on the blockchain with ease. Whether you're a <span style={styles.highlight}>developer, entrepreneur</span>, or blockchain enthusiast, you can launch <span style={styles.highlight}>ERC-20 compatible tokens</span> in just a few clicks.
          </p>

          {/* Key Features Section */}
          <Header as="h2" style={styles.sectionHeader}>
            <Icon name="star" style={{...styles.sectionIcon, color: "#f1c40f"}} /> Key Features
          </Header>

          <div style={styles.featureContainer}>
            {[
              {
                icon: "certificate",
                title: "Custom Tokens",
                description: "Create ERC-20 tokens with your own name, symbol, and supply"
              },
              {
                icon: "lightning",
                title: "Instant Deployment",
                description: "Deploy tokens to the blockchain in seconds"
              },
              {
                icon: "shield",
                title: "Secure Connection",
                description: "Connect securely with your preferred wallet"
              },
              {
                icon: "search",
                title: "Blockchain Verified",
                description: "Track your tokens on blockchain explorers"
              }
            ].map((feature, index) => (
              <div key={index} style={styles.featureCard}>
                <div style={styles.featureIconContainer}>
                  <Icon name={feature.icon} size="large" style={styles.featureIcon} />
                </div>
                <div style={styles.featureContent}>
                  <h3 style={styles.featureTitle}>{feature.title}</h3>
                  <p style={styles.featureDescription}>{feature.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* How It Works */}
          <Header as="h2" style={styles.sectionHeader}>
            <Icon name="lightbulb" style={{...styles.sectionIcon, color: "#f39c12"}} /> How It Works
          </Header>
          
          <div style={styles.stepsContainer}>
            {[
              { 
                number: "01", 
                title: "Connect Wallet", 
                description: "Connect your MetaMask or other compatible wallet",
                icon: "plug"
              },
              { 
                number: "02", 
                title: "Configure Token", 
                description: "Set your token name, symbol, and total supply",
                icon: "edit"
              },
              { 
                number: "03", 
                title: "Deploy", 
                description: "Click 'Deploy Token' and confirm the transaction",
                icon: "send"
              },
              { 
                number: "04", 
                title: "Verify", 
                description: "View your token on the blockchain explorer",
                icon: "check circle"
              }
            ].map((step, index) => (
              <div key={index} style={styles.step}>
                <div style={styles.stepNumber}>{step.number}</div>
                <div style={styles.stepContent}>
                  <div style={styles.stepIconContainer}>
                    <Icon name={step.icon} style={styles.stepIcon} />
                  </div>
                  <h3 style={styles.stepTitle}>{step.title}</h3>
                  <p style={styles.stepDescription}>{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Supported Networks */}
          <Header as="h2" style={styles.sectionHeader}>
            <Icon name="globe" style={{...styles.sectionIcon, color: "#3498db"}} /> Supported Networks
          </Header>
          
          <div style={styles.networkContainer}>
            {["Berachain", "Soneium", "Ink", "Unichain", "Linea", "Monad Testnet"].map((network, index) => (
              <div key={index} style={styles.networkBadge}>
                {network}
              </div>
            ))}
          </div>

          {/* Closing Statement */}
          <div style={styles.closingContainer}>
            <p style={styles.closingText}>
              Start creating your own tokens today and join the decentralized finance revolution!
            </p>
            <Button 
              primary 
              size="large" 
              onClick={() => navigate("/")}
              style={styles.actionButton}
            >
              <Icon name="arrow left" /> Back to Token Factory
            </Button>
          </div>
        </Segment>
      </Container>
    </div>
  );
};

// Enhanced Responsive Styles
const styles = {
  pageBackground: {
    background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
    minHeight: "100vh",
    paddingTop: "40px",
    paddingBottom: "40px",
  },
  container: {
    width: "100%",
    maxWidth: "900px",
    padding: "0 15px",
    margin: "0 auto",
  },
  segment: {
    backgroundColor: "#fff",
    borderRadius: "16px",
    padding: "30px 20px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
    border: "none",
    overflowX: "hidden",
    width: "100%",
    margin: "0 auto",
  },
  title: {
    color: "#2c3e50",
    fontSize: "28px",
    fontWeight: "700",
    marginBottom: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    textAlign: "center",
    wordBreak: "break-word",
  },
  titleIcon: {
    color: "#e74c3c",
    marginBottom: "15px",
  },
  titleSubheader: {
    color: "#7f8c8d",
    fontSize: "16px",
    fontWeight: "400",
    marginTop: "10px",
    textAlign: "center",
  },
  divider: {
    margin: "25px 0",
    borderTop: "1px solid #f0f0f0",
    borderBottom: "none",
    width: "100%",
  },
  paragraph: {
    fontSize: "16px",
    lineHeight: "1.8",
    color: "#34495e",
    textAlign: "center",
    maxWidth: "100%",
    margin: "0 auto 30px auto",
    padding: "0 5px",
  },
  highlight: {
    color: "#3498db",
    fontWeight: "600",
  },
  sectionHeader: {
    fontSize: "22px",
    fontWeight: "700",
    color: "#2c3e50",
    margin: "30px 0 20px 0",
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    wordBreak: "break-word",
  },
  sectionIcon: {
    marginRight: "10px",
  },
  featureContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "15px",
    justifyContent: "center",
    margin: "20px 0",
  },
  featureCard: {
    display: "flex",
    alignItems: "flex-start",
    padding: "15px",
    borderRadius: "12px",
    backgroundColor: "#f8f9fa",
    marginBottom: "5px",
    width: "100%",
    maxWidth: "400px",
    border: "1px solid #f0f0f0",
    boxSizing: "border-box",
  },
  featureIconContainer: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    backgroundColor: "#ebf5fb",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginRight: "15px",
    flexShrink: 0,
  },
  featureIcon: {
    color: "#3498db",
  },
  featureContent: {
    flex: 1,
    overflow: "hidden",
  },
  featureTitle: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#2c3e50",
    marginTop: "0",
    marginBottom: "5px",
  },
  featureDescription: {
    fontSize: "14px",
    color: "#7f8c8d",
    margin: 0,
    lineHeight: "1.5",
  },
  stepsContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    margin: "25px 0",
  },
  step: {
    display: "flex",
    alignItems: "flex-start",
    width: "100%",
  },
  stepNumber: {
    fontSize: "20px",
    fontWeight: "800",
    color: "#ffffff",
    marginRight: "15px",
    backgroundColor: "#3498db",
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    boxShadow: "0 4px 8px rgba(52, 152, 219, 0.2)",
  },
  stepContent: {
    backgroundColor: "#f8f9fa",
    padding: "15px",
    borderRadius: "12px",
    flex: 1,
    border: "1px solid #f0f0f0",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    overflow: "hidden",
  },
  stepIconContainer: {
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    backgroundColor: "#ebf5fb",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "10px",
  },
  stepIcon: {
    color: "#3498db",
    fontSize: "14px",
  },
  stepTitle: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#2c3e50",
    marginTop: "0",
    marginBottom: "5px",
  },
  stepDescription: {
    fontSize: "14px",
    color: "#7f8c8d",
    margin: 0,
    lineHeight: "1.5",
    wordBreak: "break-word",
  },
  networkContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
    margin: "20px 0 30px 0",
    justifyContent: "center",
  },
  networkBadge: {
    backgroundColor: "#ebf5fb",
    color: "#3498db",
    padding: "8px 16px",
    borderRadius: "20px",
    fontSize: "14px",
    fontWeight: "500",
    display: "inline-block",
    margin: "5px",
  },
  closingContainer: {
    textAlign: "center",
    marginTop: "30px",
    backgroundColor: "#f8f9fa",
    padding: "20px 15px",
    borderRadius: "12px",
    border: "1px solid #f0f0f0",
    width: "100%",
  },
  closingText: {
    fontSize: "16px",
    fontWeight: "500",
    color: "#2c3e50",
    marginBottom: "20px",
    wordBreak: "break-word",
  },
  actionButton: {
    padding: "10px 20px",
    borderRadius: "10px",
    fontSize: "15px",
    fontWeight: "600",
    boxShadow: "0 4px 10px rgba(52, 152, 219, 0.25)",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "auto",
    maxWidth: "100%",
  },
};

export default About;