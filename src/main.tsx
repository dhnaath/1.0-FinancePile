import {StrictMode, useEffect, useState} from 'react';
import {createRoot} from 'react-dom/client';
import { GoogleOAuthProvider } from '@react-oauth/google';
import App from './App.tsx';
import './index.css';

function Root() {
  const [clientId, setClientId] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/oauth-config')
      .then(res => res.json())
      .then(data => {
        setClientId(data.clientId || 'unconfigured-client-id');
      })
      .catch((err) => {
        console.error(err);
        setClientId('unconfigured-client-id');
      });
  }, []);

  if (!clientId) {
    return (
      <div className="min-h-screen bg-[#1a1a1a] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-t-[#00bcd4] border-[#2a2a2a] rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <App />
    </GoogleOAuthProvider>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Root />
  </StrictMode>,
);
