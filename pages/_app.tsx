import "../css/index.css";
import "../css/nprogress.css";
import "../css/markdown.css";
import "../css/theme.css";
import 'simplebar/dist/simplebar.min.css';
import React from "react";
import { AppProps } from "next/app";
import Router from "next/router";
import NProgress from "nprogress";
import { Breakpoint, BreakpointProvider, setDefaultBreakpoints } from 'react-socks';

NProgress.configure({ showSpinner: false });
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

setDefaultBreakpoints([
    { md: 768 },
    { mdu: 769 },
    { mdd: 767 },
]);

function MyApp({ Component, pageProps }: AppProps) {
    return <BreakpointProvider> <Component {...pageProps} /> </BreakpointProvider>;
}

export default MyApp;
