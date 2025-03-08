"use client"
import { Form, Input, Button, Header, Icon, Popup } from "semantic-ui-react"
import LoadingSpinner from "./LoadingSpinner"

const TokenForm = ({
  name,
  setName,
  symbol,
  setSymbol,
  totalSupply,
  setTotalSupply,
  createToken,
  creatingToken,
  walletConnected,
  network,
  networkName,
}) => {
  // Validate symbol input - only allow uppercase letters and numbers
  const handleSymbolChange = (e) => {
    const value = e.target.value.toUpperCase()
    const regex = /^[A-Z0-9]*$/
    if (value === "" || regex.test(value)) {
      setSymbol(value)
    }
  }

  // Validate total supply input - only allow numbers
  const handleTotalSupplyChange = (e) => {
    const value = e.target.value
    const regex = /^[0-9]*$/
    if (value === "" || regex.test(value)) {
      setTotalSupply(value)
    }
  }

  return (
    <div
      style={{
        marginBottom: "50px",
      }}
    >
      <Form
        className="token-form"
        style={{
          background: "white",
          padding: "30px",
          borderRadius: "16px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
          maxWidth: "480px",
          width: "100%",
          margin: "auto",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
        }}
      >
        <Header
          as="h2"
          textAlign="center"
          style={{
            marginBottom: "25px",
            color: "#2c3e50",
            fontWeight: "600",
          }}
        >
          <Icon name="certificate" style={{ color: "#3498db" }} />
          <Header.Content>Create Your Token</Header.Content>
        </Header>

        <Form.Field>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
            <label
              style={{
                fontSize: "15px",
                fontWeight: "600",
                color: "#2c3e50",
                display: "block",
              }}
            >
              Token Name
            </label>
            <Popup
              content="Choose a memorable name for your token (max 20 characters)"
              trigger={
                <Icon name="info circle" color="blue" size="small" style={{ cursor: "pointer", opacity: 0.7 }} />
              }
              position="top right"
              size="small"
              style={{ fontSize: "12px" }}
            />
          </div>
          <div className="ui input" style={{ width: "100%" }}>
            <Input
              fluid
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Example: Liberty Token"
              maxLength={20}
              style={{
                borderRadius: "10px",
                border: "1px solid rgba(34, 36, 38, 0.15)",
                transition: "all 0.3s",
              }}
              icon={{
                name: "tag",
                color: name ? "blue" : "grey",
                style: { opacity: 0.7 },
              }}
              disabled={creatingToken}
              error={name.length > 0 && name.length < 3}
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "5px",
            }}
          >
            <small style={{ color: "#7f8c8d", display: "block" }}>Choose a memorable name</small>
            <small
              style={{
                color: name.length > 0 ? (name.length < 3 ? "#e74c3c" : "#2ecc71") : "#7f8c8d",
              }}
            >
              {name.length}/20
            </small>
          </div>
        </Form.Field>

        <Form.Field style={{ marginTop: "20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
            <label
              style={{
                fontSize: "15px",
                fontWeight: "600",
                color: "#2c3e50",
                display: "block",
              }}
            >
              Token Symbol
            </label>
            <Popup
              content="Usually 3-6 characters (letters and numbers only, automatically uppercase)"
              trigger={
                <Icon name="info circle" color="blue" size="small" style={{ cursor: "pointer", opacity: 0.7 }} />
              }
              position="top right"
              size="small"
              style={{ fontSize: "12px" }}
            />
          </div>
          <div className="ui input" style={{ width: "100%" }}>
            <Input
              fluid
              value={symbol}
              onChange={handleSymbolChange}
              placeholder="Example: LTN"
              maxLength={6}
              style={{
                borderRadius: "10px",
                border: "1px solid rgba(34, 36, 38, 0.15)",
                transition: "all 0.3s",
              }}
              icon={{
                name: "dollar",
                color: symbol ? "blue" : "grey",
                style: { opacity: 0.7 },
              }}
              disabled={creatingToken}
              error={symbol.length > 0 && symbol.length < 2}
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "5px",
            }}
          >
            <small style={{ color: "#7f8c8d", display: "block" }}>Usually 3-6 characters</small>
            <small
              style={{
                color: symbol.length > 0 ? (symbol.length < 2 ? "#e74c3c" : "#2ecc71") : "#7f8c8d",
              }}
            >
              {symbol.length}/6
            </small>
          </div>
        </Form.Field>

        <Form.Field style={{ marginTop: "20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
            <label
              style={{
                fontSize: "15px",
                fontWeight: "600",
                color: "#2c3e50",
                display: "block",
              }}
            >
              Total Supply
            </label>
            <Popup
              content="The initial amount of tokens to create (whole numbers only)"
              trigger={
                <Icon name="info circle" color="blue" size="small" style={{ cursor: "pointer", opacity: 0.7 }} />
              }
              position="top right"
              size="small"
              style={{ fontSize: "12px" }}
            />
          </div>
          <div className="ui input" style={{ width: "100%" }}>
            <Input
              fluid
              value={totalSupply}
              onChange={handleTotalSupplyChange}
              placeholder="Example: 1000000"
              style={{
                borderRadius: "10px",
                border: "1px solid rgba(34, 36, 38, 0.15)",
                transition: "all 0.3s",
              }}
              icon={{
                name: "coins",
                color: totalSupply ? "blue" : "grey",
                style: { opacity: 0.7 },
              }}
              disabled={creatingToken}
              error={totalSupply.length > 0 && Number.parseInt(totalSupply) <= 0}
            />
          </div>
          <small style={{ color: "#7f8c8d", marginTop: "5px", display: "block" }}>
            The initial amount of tokens to create
          </small>
        </Form.Field>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "30px",
            position: "relative",
          }}
        >
          <Button
            primary
            size="medium"
            onClick={createToken}
            disabled={creatingToken || !walletConnected || !name || !symbol || !totalSupply}
            style={{
              fontSize: "15px",
              fontWeight: "600",
              padding: creatingToken ? "10px 16px" : "10px 20px",
              borderRadius: "10px",
              transition: "all 0.3s ease",
              background: !walletConnected || !name || !symbol || !totalSupply ? "#95a5a6" : "#2980b9",
              boxShadow: "0 4px 8px rgba(41, 128, 185, 0.2)",
              width: "auto",
              minWidth: "160px",
              maxWidth: "220px",
              position: "relative",
              height: "44px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            className="deploy-button"
          >
            {creatingToken ? (
              <span>Deploying...</span>
            ) : !walletConnected ? (
              <>
                <Icon name="linkify" style={{ marginRight: "5px" }} />
                <span>Connect Wallet</span>
              </>
            ) : !name || !symbol || !totalSupply ? (
              <>
                <Icon name="exclamation circle" style={{ marginRight: "5px" }} />
                <span>Fill All Fields</span>
              </>
            ) : (
              <>
                <Icon name="rocket" style={{ marginRight: "5px" }} />
                <span>Deploy Token</span>
              </>
            )}
          </Button>
        </div>

        {/* Use LoadingSpinner component when creating token */}
        {creatingToken && <LoadingSpinner />}

        {!walletConnected && (
          <div
            style={{
              textAlign: "center",
              marginTop: "15px",
              color: "#e74c3c",
              fontSize: "13px",
            }}
          >
            <Icon name="info circle" />
            Please connect your wallet to deploy tokens
          </div>
        )}

        <div
          style={{
            marginTop: "25px",
            textAlign: "center",
            padding: "15px",
            borderTop: "1px solid #f0f0f0",
            color: "#7f8c8d",
            fontSize: "13px",
          }}
        >
          <Icon name="shield" /> Your token will be deployed to {networkName || "the current network"}
        </div>
      </Form>
    </div>
  )
}

export default TokenForm