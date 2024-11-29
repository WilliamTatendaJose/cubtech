import type { AppProps } from 'next/app'
import { CartProvider } from '@/components/cartProvider'
import { ToastWrapper } from '@/components/toast-context'
//  import "@/app/global.css"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CartProvider>
      <ToastWrapper>
        <Component {...pageProps} />
      </ToastWrapper>
    </CartProvider>
  )
}

export default MyApp

