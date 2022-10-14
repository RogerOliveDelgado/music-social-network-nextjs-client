import type { AppProps } from "next/app";
import Player from "../components/Player/Player";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import { I18NProvider } from "../context/i18";
import { CookiesProvider } from "react-cookie";
import "../styles/globals.css";

type ComponentWithPageLayout = AppProps & {
  Component: AppProps["Component"] & {
    PageLayout?: React.ComponentType;
  };
};

function MyApp({ Component, pageProps }: ComponentWithPageLayout) {
  return (
    <CookiesProvider>
      <Provider store={store}>
        <I18NProvider>
          <div className="App">
            <Component {...pageProps} />
            <Player />
          </div>
        </I18NProvider>
      </Provider>
    </CookiesProvider>
  );
}

export default MyApp;
