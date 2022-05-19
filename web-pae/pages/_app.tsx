/* eslint-disable react/jsx-props-no-spreading */
import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import React, { ReactElement, ReactNode } from 'react';
import '../styles/globals.css';

type NextPageWithLayout = NextPage & {
  // define the getLayout method for every page
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  // override the default Component definition
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page: ReactElement) => page);
  return getLayout(<Component {...pageProps} />);
}

export default MyApp;
