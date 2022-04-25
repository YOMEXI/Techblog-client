import "react-toastify/dist/ReactToastify.css";

import "../styles/globals.css";
import "../styles/components.css";
import "../styles/mediaQueries.css";

import type { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material";
import { theme } from "../shared/utils";
import Layout from "../shared/components/layouts/Layout";
import axios from "axios";
import { SWRConfig } from "swr";
import { Provider } from "react-redux";
import { store } from "../shared/components/redux/store";
import { ToastContainer, toast } from "react-toastify";

import dynamic from "next/dynamic";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API;
axios.defaults.withCredentials = true;
axios.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    return Promise.reject(error.response);
  }
);

//
const fetcher = async (url: string) => {
  try {
    const res = await axios.get(url);
    return res.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

//

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <SWRConfig
        value={{
          fetcher: fetcher,
          dedupingInterval: 10000,
        }}
      >
        <ThemeProvider theme={theme}>
          <Provider store={store}>
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />

            <Layout>
              <Component {...pageProps} />
            </Layout>
          </Provider>
        </ThemeProvider>
      </SWRConfig>
    </>
  );
}

export default dynamic(() => Promise.resolve(MyApp), {
  ssr: false,
});
