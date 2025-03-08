const LoadingSpinner = () => {
  return (
    <div className="transaction-message" style={styles.container}>
      <div style={styles.content}>
        <div style={styles.dotContainer}>
          <div style={{ ...styles.dot, animationDelay: "0s" }}></div>
          <div style={{ ...styles.dot, animationDelay: "0.3s" }}></div>
          <div style={{ ...styles.dot, animationDelay: "0.6s" }}></div>
        </div>
        <span style={styles.text}>Please confirm the transaction in your wallet</span>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { transform: scale(0.5); opacity: 0.5; }
          50% { transform: scale(1); opacity: 1; }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}

const styles = {
  container: {
    backgroundColor: "#f8fafc",
    borderRadius: "10px",
    padding: "16px",
    marginTop: "20px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.03)",
    width: "100%",
    animation: "fadeIn 0.3s ease-out",
    border: "1px solid rgba(52, 152, 219, 0.2)",
  },
  content: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "12px",
  },
  dotContainer: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
  },
  dot: {
    width: "6px",
    height: "6px",
    borderRadius: "50%",
    backgroundColor: "#3498db",
    animation: "pulse 1.5s infinite",
  },
  text: {
    color: "#2c3e50",
    fontSize: "14px",
    fontWeight: "500",
  },
}

export default LoadingSpinner