import React from "react";
import Footer from "../components/Footer";
import HeaderImage from "../components/HomeImage";
import HeaderNormal from "../components/HeaderNormal";
import LoginAndRegister from "../components/LoginAndRegister";

export function Login() {
    return (
      <>
        <HeaderNormal />
        <HeaderImage />
        <div style={{ minHeight: "calc(100vh - 190px)" }}>
          <LoginAndRegister />
        </div>
        <Footer />
      </>
    );
  }
  