import "../styles/globals.css";
import type { AppProps } from "next/app";
import Player from "../components/Player/Player";

type ComponentWithPageLayout = AppProps & {
  Component: AppProps["Component"] & {
    PageLayout?: React.ComponentType;
  };
};

function MyApp({ Component, pageProps }: ComponentWithPageLayout) {
  return (
    <>
      <div className="App">
        <Component {...pageProps} />
        <Player />
      </div>
    </>
  );
}

export default MyApp;
