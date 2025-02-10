import React, { useEffect, useState } from "react";
import { Message } from "semantic-ui-react";

const MessageBox = ({ message }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (message && message.type === "info") {
      const timer = setTimeout(() => setVisible(false), 3000); // Auto-hide info messages after 3s
      return () => clearTimeout(timer);
    }
  }, [message]);

  if (!visible || !message) return null;

  return (
    <Message
      positive={message.type === "success"}
      negative={message.type === "error"}
      info={message.type === "info"}
      content={<span dangerouslySetInnerHTML={{ __html: message.content }} />}
      style={{
        fontSize: "14px",
        fontWeight: "bold",
        padding: "12px",
        borderRadius: "8px",
        margin: "10px 0",
        transition: "opacity 0.5s ease-in-out",
        opacity: visible ? 1 : 0, // Fade-out effect
      }}
    />
  );
};

export default MessageBox;
