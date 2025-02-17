import React from "react";
import { Form, Input, Button, Loader } from "semantic-ui-react";

const TokenForm = ({ name, setName, symbol, setSymbol, totalSupply, setTotalSupply, createToken, creatingToken }) => {
  return (
    <Form
      style={{
        background: "white",
        padding: "25px",
        borderRadius: "12px",
        boxShadow: "0px 3px 8px rgba(0,0,0,0.15)",
        maxWidth: "460px", // Diperbesar tapi tidak berlebihan
        width: "100%",
        margin: "auto",
      }}
    >
      <Form.Field>
        <label style={{ fontSize: "16px", fontWeight: "bold" }}>Token Name</label>
        <Input
          fluid
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Example: Liberty Token"
          maxLength={20}
          style={{ padding: "12px", fontSize: "14px" }}
        />
      </Form.Field>

      <Form.Field>
        <label style={{ fontSize: "16px", fontWeight: "bold" }}>Token Symbol</label>
        <Input
          fluid
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
          placeholder="Example: LTN"
          maxLength={6}
          style={{ padding: "12px", fontSize: "14px" }}
        />
      </Form.Field>

      <Form.Field>
        <label style={{ fontSize: "16px", fontWeight: "bold" }}>Total Supply</label>
        <Input
          fluid
          value={totalSupply}
          onChange={(e) => setTotalSupply(e.target.value)}
          placeholder="Example: 1000000"
          style={{ padding: "12px", fontSize: "14px" }}
        />
      </Form.Field>

      <div style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}>
        <Button
          color="blue"
          onClick={createToken}
          disabled={creatingToken}
          style={{
            fontSize: "16px",
            fontWeight: "bold",
            padding: "12px 24px", // Lebih proporsional
            borderRadius: "8px",
            transition: "all 0.3s ease",
            backgroundColor: creatingToken ? "#0056b3" : "#007bff",
            cursor: creatingToken ? "not-allowed" : "pointer",
            width: "auto", // Tidak full-width
            minWidth: "180px", // Ukuran minimal agar tetap terlihat bagus
          }}
        >
          {creatingToken ? <Loader active inline size="small" inverted /> : "Deploy Token"}
        </Button>
      </div>
    </Form>
  );
};

export default TokenForm;
