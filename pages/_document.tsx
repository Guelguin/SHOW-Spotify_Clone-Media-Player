import { CssBaseline } from '@nextui-org/react';
import Document, { Head, Html, Main, NextScript } from 'next/document';
import React from 'react';
import Loader from './../components/common/Loader';

class MyDocument extends Document {
  static async getInitialProps(ctx: any) {
    const initialProps = await Document.getInitialProps(ctx);
    return {
      ...initialProps,
      styles: React.Children.toArray([initialProps.styles])
    };
  }

  render() {
    return (
      <Html lang="en">
        <Head>{CssBaseline.flush()}</Head>
        <body>
          <Loader />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
