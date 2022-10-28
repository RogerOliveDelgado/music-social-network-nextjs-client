import type { AppProps } from 'next/app';
import Player from '../components/Player/Player';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import { I18NProvider } from '../context/i18';
import { CookiesProvider } from 'react-cookie';
import Router from 'next/router';
import ProgressBar from '@badrap/bar-of-progress';
import '../styles/globals.css';

const progress = new ProgressBar({
  size: 6,
  color: '#695ee4',
  className: 'z-50',
  delay: 100,
});

Router.events.on('routeChangeStart', progress.start);
Router.events.on('routeChangeComplete', progress.finish);
Router.events.on('routeChangeError', progress.finish);

type ComponentWithPageLayout = AppProps & {
  Component: AppProps['Component'] & {
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
