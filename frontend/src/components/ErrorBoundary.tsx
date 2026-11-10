'use client';

import { Component, type ReactNode } from 'react';
import { AlertTriangle } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="flex flex-col items-center justify-center py-12 px-4">
          <AlertTriangle className="w-10 h-10 text-orange-500 mb-3" />
          <p className="text-sm font-semibold text-gray-900 dark:text-white mb-1">Something went wrong</p>
          <p className="text-xs text-gray-500 mb-3">This section failed to load.</p>
          <button
            onClick={() => this.setState({ hasError: false })}
            className="text-xs font-bold text-blue-600 hover:text-blue-700 px-3 py-1.5 rounded-lg border border-blue-200 dark:border-blue-800 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
          >
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
