import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error in UI:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center p-6 text-center">
          <div className="max-w-md bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-xl shadow-2xl">
            <h1 className="text-xl font-medium tracking-tight mb-2">Ops, algo não carregou como esperado</h1>
            <p className="text-sm text-white/60 mb-6 font-light">
              Tente recarregar a página para continuar navegando no portfólio.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-5 py-2.5 rounded-full bg-white text-gray-950 text-xs font-semibold uppercase tracking-wider hover:bg-white/90 transition-all cursor-pointer shadow-lg hover:scale-105 active:scale-95"
            >
              Recarregar Página
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
