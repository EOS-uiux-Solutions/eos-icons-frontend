import type { AppProps } from 'next/app'
import React from 'react'
import '../assets/scss/index.scss'

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
