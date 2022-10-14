import type { AppProps } from "next/app";
import Player from "../components/Player/Player";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import { I18NProvider } from "../context/i18";
import "../styles/globals.css";
import { AuthContextProvider } from "../context/AuthContext";

type ComponentWithPageLayout = AppProps & {
  Component: AppProps["Component"] & {
    PageLayout?: React.ComponentType;
  };
};

function MyApp({ Component, pageProps }: ComponentWithPageLayout) {
  return (
    <AuthContextProvider>
      <Provider store={store}>
        <I18NProvider>
          <div className="App">
            <Component {...pageProps} />
            <Player />
          </div>
        </I18NProvider>
      </Provider>
    </AuthContextProvider>
  );
}

export default MyApp;
