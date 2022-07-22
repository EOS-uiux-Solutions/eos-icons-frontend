import React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head>
          <link
            rel='stylesheet'
            href='https://cdn.jsdelivr.net/npm/eos-icons@latest/dist/css/eos-icons.css'
          />
          <link
            rel='stylesheet'
            href='https://cdn.jsdelivr.net/npm/eos-icons@latest/dist/css/outlined/eos-icons-outlined.css'
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
