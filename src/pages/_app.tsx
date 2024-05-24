import React from "react";
import { AppProps } from "next/app";
import { Provider } from "react-redux";
import store from "../../store";
import Navbar from "../components/Navbar";
import FuseMessage from "../components/Message";
import { useSplashScreenLoading } from "../../store/hooks";
import SplashScreen from "../components/SplashScreen";
// import "../styles/gl";

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  const isLoading = useSplashScreenLoading();

  return (
    <Provider store={store}>
      <Navbar />
      <FuseMessage />
      {isLoading ? <SplashScreen /> : <Component {...pageProps} />}
    </Provider>
  );
};

export default MyApp;
