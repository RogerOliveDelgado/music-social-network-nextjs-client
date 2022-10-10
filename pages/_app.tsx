import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Player from '../components/Player/Player';
import { Provider } from 'react-redux';
import { store } from '../redux/store';

type ComponentWithPageLayout = AppProps & {
  Component: AppProps['Component'] & {
    PageLayout?: React.ComponentType;
  };
};

function MyApp({ Component, pageProps }: ComponentWithPageLayout) {
  return (
    <Provider store={store}>
      <div className="App">
        <Component {...pageProps} />
        <Player />
      </div>
    </Provider>
  );
}

export default MyApp;
