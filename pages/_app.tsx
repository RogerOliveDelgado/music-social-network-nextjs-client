import type { AppProps } from 'next/app';
import Player from '../components/Player/Player';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import { I18NProvider } from '../context/i18';
import '../styles/globals.css';

type ComponentWithPageLayout = AppProps & {
  Component: AppProps['Component'] & {
    PageLayout?: React.ComponentType;
  };
};

function MyApp({ Component, pageProps }: ComponentWithPageLayout) {
  return (
    <Provider store={store}>
      <I18NProvider>
        <div className="App">
          <Component {...pageProps} />
          <Player />
        </div>
      </I18NProvider>
    </Provider>
  );
}

export default MyApp;
