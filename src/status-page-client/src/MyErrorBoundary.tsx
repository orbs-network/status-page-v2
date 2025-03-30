import React from 'react';

export class MyErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError(error: any) {
    console.log ("Error in getDerivedStateFromError", error);
    return { hasError: true };
  }

  componentDidCatch(error: any, info: any) {
    // log error to a reporting service
    // window.location.reload();
  }

  render() {
    if (this.state.hasError) {
      console.log ("Error in MyErrorBoundary", this.props.children, this.state);
      return <div>Something went wrong.</div>;
    }
    return this.props.children;
  }
}