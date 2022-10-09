import type { AppProps } from 'next/app'
import React from 'react'
import '../public/assets/scss/index.scss'
import { AppWrapper } from '../utils/AppContext'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import CookiesBanner from '../components/CookiesBanner'
import ScrollToTopBtn from '../components/ScrollToTop'
import { IconSetWrapper } from '../utils/IconSetContext'
import Head from 'next/head'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel='shortcut icon' href='favicon.ico' />
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1, user-scalable=no'
        />
        <meta name='title' content='EOS free & open source icons' />
        <meta
          name='description'
          content='Commercial, non-commercial, use them as you please. EOS icons comes with an MIT license, has an open source community, and welcomes your collaboration too.'
        />

        <meta property='og:type' content='website' />
        <meta property='og:url' content='https://eos-icons.com/' />
        <meta property='og:title' content='EOS free & open source icons' />
        <meta
          property='og:description'
          content='Commercial, non-commercial, use them as you please. EOS icons comes with an MIT license, has an open source community, and welcomes your collaboration too.'
        />
        <meta
          property='og:image'
          content='https://res.cloudinary.com/eosdesignsystem/image/upload/v1600948913/EOS/Social/eos-icons-social-media.jpg'
        />

        <meta property='twitter:card' content='summary_large_image' />
        <meta property='twitter:url' content='https://eos-icons.com/' />
        <meta property='twitter:title' content='EOS free & open source icons' />
        <meta
          property='twitter:description'
          content='Commercial, non-commercial, use them as you please. EOS icons comes with an MIT license, has an open source community, and welcomes your collaboration too.'
        />
        <meta
          property='twitter:image'
          content='https://res.cloudinary.com/eosdesignsystem/image/upload/v1600948913/EOS/Social/eos-icons-social-media.jpg'
        />

        <link
          rel='stylesheet'
          href='https://cdn.jsdelivr.net/npm/eos-icons@latest/dist/css/eos-icons.css'
        />
        <link
          rel='stylesheet'
          href='https://cdn.jsdelivr.net/npm/eos-icons@latest/dist/css/eos-icons-outlined.css'
        />

        <meta name='theme-color' content='#000000' />

        <link rel='manifest' href='manifest.json' />

        <title>EOS Icons</title>
      </Head>
      <AppWrapper>
        <IconSetWrapper>
          <Navigation />
          <Component {...pageProps} />
          <Footer />
          <ScrollToTopBtn />
          <CookiesBanner />
        </IconSetWrapper>
      </AppWrapper>
    </>
  )
}
