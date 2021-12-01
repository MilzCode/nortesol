import React from "react";

const AssetApk = () => {
  if (typeof window !== "undefined") {
    window.location.replace("/api/androidapp");
  }
  return null;
};

export default AssetApk;
