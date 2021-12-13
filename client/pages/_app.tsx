import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from 'react-query';
import Toast from '../components/Toast';
import { useEffect, useRef, useState } from 'react';
import { ToastContext } from '../utils';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  const [toastText, setToastText] = useState('');

  const clearToast = () => {
    setToastText('');
    clearTimeout(timeout.current);
  };

  const timeout = useRef<number>();
  useEffect(() => {
    if (!!toastText) {
      timeout.current = window.setTimeout(clearToast, 5000);
    }
  }, [toastText]);

  return <QueryClientProvider client={queryClient}>
    <ToastContext.Provider value={{ showToast: setToastText }}>
      <Component {...pageProps} />
      {!!toastText && <Toast text={toastText} onClick={clearToast} />}
    </ToastContext.Provider>
  </QueryClientProvider>
}

export default MyApp
