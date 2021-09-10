import React from "react";
import Footer from "./recursos/Footer";
import Header from "./recursos/Header";

const Layout = (props: any) => {
  return (
    <>
      <Header />
      <main className="layout__content">{props.children}</main>
      <Footer />
    </>
  );
};

export default Layout;
