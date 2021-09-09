import React from "react";
import Header from "./recursos/Header";

const Layout = (props: any) => {
  return (
    <>
      <Header />
      <main className="layout__content">{props.children}</main>
    </>
  );
};

export default Layout;
