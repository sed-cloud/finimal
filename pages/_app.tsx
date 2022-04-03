import '../styles/globals.css'
import { AuthProvider } from '../contexts/auth';
import Head from 'next/head';
import { CustomAppProps } from '../lib/custom-page';
import { NotificationProvider } from '../contexts/notification';
import { PlaidProvider } from '../contexts/plaid/context';



function MyApp({ Component, pageProps }: CustomAppProps) {
  return (
    <>
      {Component.requiresAuth && (
        <Head>
          <script
            // If no token is found, redirect inmediately
            dangerouslySetInnerHTML={{
              __html: `if(!document.cookie || document.cookie.indexOf('token') === -1)
            {location.replace(
              "/?next=" +
                encodeURIComponent(location.pathname + location.search)
            )}
            else {document.documentElement.classList.add("render")}`,
            }}
          />
        </Head>
      )}
      <NotificationProvider>
        <AuthProvider>
          <PlaidProvider>
            <Component {...pageProps} />
          </PlaidProvider>
        </AuthProvider>
      </NotificationProvider>
    </>
  )
}

export default MyApp
