import type { AppProps } from 'next/app'
import React from 'react'
import '../public/assets/scss/index.scss'
import { AppWrapper } from '../utils/AppContext'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import CookiesBanner from '../components/CookiesBanner'
import ScrollToTopBtn from '../components/ScrollToTop'
import { IconSetWrapper } from '../utils/IconSetContext'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppWrapper>
      <IconSetWrapper>
        <Navigation />
        <Component {...pageProps} />
        <Footer />
        <ScrollToTopBtn />
        <CookiesBanner />
      </IconSetWrapper>
    </AppWrapper>
  )
}
