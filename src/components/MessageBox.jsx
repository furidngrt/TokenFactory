"use client"

import { useEffect, useState } from "react"
import { Message, Icon, Transition } from "semantic-ui-react"

const MessageBox = ({ message }) => {
  const [visible, setVisible] = useState(true)
  const [shouldRender, setShouldRender] = useState(true)
  const [progress, setProgress] = useState(100)
  const [isHovered, setIsHovered] = useState(false)

  // Reset visibility when message changes
  useEffect(() => {
    if (message) {
      setVisible(true)
      setShouldRender(true)
      setProgress(100)
    }
  }, [message])

  // Auto-hide timer based on message type
  useEffect(() => {
    if (!message) return

    let duration = 0

    // Different durations based on message type
    if (message.type === "info") duration = 5000
    else if (message.type === "success") duration = 10000

    // Only set timer for info and success messages
    if (duration > 0 && !isHovered) {
      // Progress bar animation
      const interval = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev - 100 / (duration / 100)
          return newProgress < 0 ? 0 : newProgress
        })
      }, 100)

      // Set timer to hide message after duration
      const timer = setTimeout(() => {
        setVisible(false)
        // Remove from DOM after animation completes
        const removeTimer = setTimeout(() => {
          setShouldRender(false)
        }, 500)
        return () => clearTimeout(removeTimer)
      }, duration)

      return () => {
        clearTimeout(timer)
        clearInterval(interval)
      }
    }
  }, [message, isHovered])

  // If no message or should not render, return null
  if (!shouldRender || !message) return null

  // Get appropriate icon based on message type
  const getIcon = () => {
    switch (message.type) {
      case "success":
        return "check circle"
      case "error":
        return "exclamation circle"
      case "warning":
        return "warning sign"
      case "info":
        return "info circle"
      default:
        return "info circle"
    }
  }

  // Get appropriate color based on message type (for custom styling)
  const getColor = () => {
    switch (message.type) {
      case "success":
        return "#21ba45"
      case "error":
        return "#db2828"
      case "warning":
        return "#f2711c"
      case "info":
        return "#2185d0"
      default:
        return "#2185d0"
    }
  }

  return (
    <Transition visible={visible} animation="fade" duration={300}>
      <Message
        positive={message.type === "success"}
        negative={message.type === "error"}
        warning={message.type === "warning"}
        info={message.type === "info"}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          fontSize: "14px",
          padding: "14px",
          borderRadius: "10px",
          margin: "15px 0",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.05)",
          border: "none",
          position: "relative",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
        }}
      >
        {/* Left border accent */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: "4px",
            backgroundColor: getColor(),
          }}
        />

        {/* Icon */}
        <Icon
          name={getIcon()}
          size="large"
          style={{
            marginRight: "12px",
            marginLeft: "8px",
            color: getColor(),
          }}
        />

        {/* Message content */}
        <div
          style={{
            lineHeight: "1.5",
            flex: 1,
          }}
          dangerouslySetInnerHTML={{ __html: message.content }}
        />

        {/* Close button for all messages */}
        <Icon
          name="close"
          style={{
            cursor: "pointer",
            opacity: 0.6,
            marginLeft: "10px",
            transition: "opacity 0.2s ease",
          }}
          onMouseOver={(e) => (e.currentTarget.style.opacity = 1)}
          onMouseOut={(e) => (e.currentTarget.style.opacity = 0.6)}
          onClick={() => setVisible(false)}
        />

        {/* Progress bar for auto-dismissing messages */}
        {(message.type === "info" || message.type === "success") && (
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              height: "3px",
              width: `${progress}%`,
              backgroundColor: getColor(),
              transition: "width 0.1s linear",
              opacity: isHovered ? 0.5 : 1,
            }}
          />
        )}
      </Message>
    </Transition>
  )
}

export default MessageBox

