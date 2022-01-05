import { Provider } from "react-redux";
import AppLayout from "../components/layouts/AppLayout";
import { store } from "../store";
import Theme from "../theme";
import { SnackbarProvider } from "notistack";

const AppWithCustomLayout = ({ Component, pageProps }) => {
  return (
    <Theme>
      <AppLayout>
        <Provider store={store}>
          <SnackbarProvider maxSnack={3}>
            <Component {...pageProps} />
          </SnackbarProvider>
        </Provider>
      </AppLayout>
    </Theme>
  );
};

function MyApp({ Component, pageProps }) {
  return <AppWithCustomLayout Component={Component} pageProps={pageProps} />;
}

export default MyApp;
