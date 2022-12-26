import { Stack } from "@mui/material"
import React from "react"

class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null }
  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      error,
    }
  }
  render() {
    if (this.state.hasError) {
      return (
        <Stack alignItems="center" mt={3}>
          出現預期外的錯誤，請再試一次
        </Stack>
      )
    }
    return this.props.children
  }
}

export default ErrorBoundary
