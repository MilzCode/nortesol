import React from "react";
import Link from "next/link";
import Volver from "../../components/general/Volver";

const nortesoladm = ({ auth, me, fb }: any) => {
  if (!auth || !me.admin) {
    window.location.href = "/";
    return null;
  }
  return (
    <>
      <Volver />
      <br />
      <Link href="/nortesoladm/addproduct" passHref>
        Crear Producto
      </Link>
    </>
  );
};

export default nortesoladm;
