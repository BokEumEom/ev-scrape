import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode; // children 타입을 ReactNode로 지정합니다.
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(_: Error): State {
    // 에러가 발생하면 fallback UI를 표시하기 위해 상태를 업데이트합니다.
    return { hasError: true, error: null, errorInfo: null };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // 에러 정보를 기록할 수 있습니다.
    // 예: logErrorToMyService(error, errorInfo);
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
  }

  render() {
    if (this.state.hasError) {
      // 에러 발생 시 렌더링할 UI
      return (
        <div>
          <h2>Something went wrong.</h2>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo && this.state.errorInfo.componentStack}
          </details>
        </div>
      );
    }

    // 에러가 없으면 자식 컴포넌트를 정상적으로 렌더링합니다.
    return this.props.children;
  }
}

export default ErrorBoundary;
