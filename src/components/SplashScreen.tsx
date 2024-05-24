import { CircularProgress } from "@mui/material";
// import Image from "next/image";
import React from "react";
// import splashImg from "../../public/images/splash.jpg";

const SplashScreen = () => {
  return (
    <div
      className="flex justify-center items-center"
      style={{
        minHeight: "90vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* <Image src={splashImg} alt="splash image" /> */}
      <CircularProgress disableShrink />
    </div>
  );
};

export default SplashScreen;
