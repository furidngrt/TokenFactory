import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Segment, Header, List, Icon, Button } from "semantic-ui-react";

const About = () => {
  const navigate = useNavigate(); // Hook untuk navigasi

  return (
    <Container text style={styles.container}>
      <Segment raised padded style={styles.segment}>
        {/* Title */}
        <Header as="h1" icon textAlign="center" style={styles.title}>
          <Icon name="info circle" color="blue" />
          About This Platform
        </Header>

        {/* Introduction */}
        <p style={styles.paragraph}>
          This platform allows users to <strong>create and deploy their own tokens</strong> on the blockchain with ease. Whether you're a <strong>developer, business</strong>, or individual, you can launch <strong>custom ERC-20 tokens</strong> in minutes.
        </p>

        {/* Key Features */}
        <Header as="h2" style={styles.header}>
          <Icon name="star" color="yellow" /> Key Features
        </Header>
        <List bulleted style={styles.list}>
          <List.Item>🚀 <strong>Create ERC-20 tokens</strong> with a custom name & symbol.</List.Item>
          <List.Item>🔢 <strong>Set your total supply</strong> effortlessly.</List.Item>
          <List.Item>🔗 <strong>Easily connect your wallet</strong> via MetaMask.</List.Item>
          <List.Item>📡 <strong>Track your tokens</strong> on the blockchain explorer.</List.Item>
        </List>

        {/* How It Works */}
        <Header as="h2" style={styles.header}>
          <Icon name="lightbulb" color="orange" /> How It Works
        </Header>
        <List ordered style={styles.list}>
          <List.Item>🔌 Connect your wallet using the <strong>"Connect Wallet"</strong> button.</List.Item>
          <List.Item>📝 Enter your <strong>token name, symbol, and total supply.</strong></List.Item>
          <List.Item>⚡ Click <strong>"Create Token"</strong> to deploy your token.</List.Item>
          <List.Item>🔍 View your token on the <strong>blockchain explorer.</strong></List.Item>
        </List>

        {/* Closing Statement */}
        <p style={styles.paragraph}>
          This project makes blockchain token creation <strong>accessible to everyone</strong>. Get started and build your <strong>digital assets today!</strong> 🌟
        </p>

        {/* Back to Home Button */}
        <div style={styles.buttonContainer}>
          <Button color="blue" onClick={() => navigate("/")}>
            <Icon name="arrow left" /> Back to Home
          </Button>
        </div>
      </Segment>
    </Container>
  );
};

// ✅ Custom CSS Styles (Mobile Responsive)
const styles = {
  container: {
    maxWidth: "800px",
    marginTop: "40px",
    padding: "20px",
  },
  segment: {
    backgroundColor: "#fff",
    borderRadius: "12px",
    padding: "25px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  },
  title: {
    color: "#333",
    fontSize: "24px",
    marginBottom: "15px",
  },
  paragraph: {
    fontSize: "16px",
    textAlign: "justify",
    lineHeight: "1.6",
    marginBottom: "15px",
  },
  header: {
    marginTop: "25px",
    color: "#333",
    fontSize: "20px",
  },
  list: {
    fontSize: "16px",
    lineHeight: "1.8",
    paddingLeft: "15px",
  },
  buttonContainer: {
    textAlign: "center",
    marginTop: "30px",
  },
};

export default About;
