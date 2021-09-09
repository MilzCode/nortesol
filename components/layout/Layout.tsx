import React from "react";
import Header from "./recursos/Header";

const Layout = (props: any) => {
  return (
    <div>
      <Header />
      <div className="layout__content">{props.children}</div>
    </div>
  );
};

export default Layout;
