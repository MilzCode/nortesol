import React from "react";

const nortesoladm = ({ auth, me, fb }: any) => {
  if (!auth || !me.admin) {
    window.location.href = "/";
    return null;
  }
  return <div>HOLAAA</div>;
};

export default nortesoladm;
