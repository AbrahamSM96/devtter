import AppLayout from 'components/AppLayout'
import '../styles/globals.css'

export default function MyApp({ Component, pageProps }) {
  return (
    <AppLayout>
      <Component {...pageProps} />
    </AppLayout>
  )
}
