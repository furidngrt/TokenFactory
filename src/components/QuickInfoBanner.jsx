import { Icon } from "semantic-ui-react"

const QuickInfoBanner = () => {
  return (
    <div style={styles.container}>
      <div style={styles.featureItem}>
        <div style={styles.contentWrapper}>
          <div style={styles.iconContainer}>
            <Icon name="linkify" style={styles.icon} />
          </div>
          <div style={styles.textContainer}>
            <h3 style={styles.title}>Multi-Chain Token Deployment</h3>
            <p style={styles.description}>
              Create and deploy ERC-20 tokens across multiple blockchains including Soneium, Berachain, Ink, and more
              with our simple, secure interface.
            </p>
            <div style={styles.badgeContainer}>
              {["Soneium", "Berachain", "Ink", "Unichain", "Linea", "Monad", "Story"].map((chain) => (
                <span key={chain} style={styles.badge}>
                  {chain}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Styles
const styles = {
  container: {
    padding: "0 15px",
    maxWidth: "900px",
    margin: "20px auto",
  },
  featureItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f8f9fc",
    borderRadius: "16px",
    padding: "25px 30px",
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.03)",
    border: "1px solid rgba(0, 0, 0, 0.03)",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
    animation: "fadeIn 0.5s ease-out",
  },
  contentWrapper: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    maxWidth: "800px",
    flexWrap: "wrap",
  },
  iconContainer: {
    width: "64px",
    height: "64px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #4a7aff, #2d5bff)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 6px 12px rgba(74, 122, 255, 0.15)",
    flexShrink: 0,
    marginRight: "25px",
  },
  icon: {
    fontSize: "26px",
    color: "white",
    margin: 0,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: "20px",
    fontWeight: "700",
    color: "#2c3e50",
    margin: "0 0 10px 0",
  },
  description: {
    fontSize: "15px",
    lineHeight: "1.6",
    color: "#4a5568",
    margin: "0 0 15px 0",
  },
  badgeContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
  },
  badge: {
    display: "inline-block",
    padding: "4px 10px",
    backgroundColor: "rgba(52, 152, 219, 0.1)",
    color: "#3498db",
    borderRadius: "12px",
    fontSize: "12px",
    fontWeight: "600",
    transition: "all 0.2s ease",
  },
  "@media (max-width: 768px)": {
    contentWrapper: {
      flexDirection: "column",
      alignItems: "flex-start",
    },
    iconContainer: {
      marginBottom: "15px",
      marginRight: 0,
    },
  },
}

export default QuickInfoBanner

