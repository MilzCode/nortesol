import React from "react";
import BotonFAColores1 from "../../components/general/BotonFAColores1";
import Volver from "../../components/general/Volver";
import ContenidoTablaPedidos from "../../components/user/ContenidoTablaPedidos";
import Link from "next/link";

const User = () => {
  const pedidos = true;
  return (
    <>
      <Volver />
      <div className="user">
        <h2 className="user__titulo">Hola, Nombre Apellido</h2>
        <hr />
        <div className="user__misDatos">
          <h3 className="user__misDatosTitulo">Mis Datos</h3>
          <div className="user__misDatosContenido">
            <p>Nombre: Juanito Perez Contreras</p>
            <p>Rut: 19555000-4</p>
            <p>Correo: juanitoperez@correo.cl</p>
            <p>Telefono: +56912345678</p>
            <p>Contraseña: ********************</p>
          </div>
          <BotonFAColores1 backgroundColor="#48d597">
            Modificar mis datos
          </BotonFAColores1>
        </div>
        <div className="user__misDirecciones">
          <h3 className="user__misDireccionesTitulo">Mis Direcciones</h3>
          <div className="user__misDireccionesContenido">
            <div className="user__direccion">
              <h4>Direccion 1</h4>
              <p>Region: Metropolitana</p>
              <p>Comuna: Las Condes</p>
              <p>Direccion: Avenida Siempreviva 123</p>
              <div className="user__botones">
                <BotonFAColores1 backgroundColor="#48d597">
                  <i className="fas fa-pen-square"></i>
                  Modificar direccion
                </BotonFAColores1>

                <BotonFAColores1 backgroundColor="#f9423a">
                  <i className="fas fa-trash-alt"></i>
                  Eliminar direccion
                </BotonFAColores1>
              </div>
            </div>
            <hr />
            <div className="user__direccion">
              <h4>Direccion 1</h4>
              <p>Region: Metropolitana</p>
              <p>Comuna: Las Condes</p>
              <p>Direccion: Avenida Siempreviva 123</p>
              <div className="user__botones">
                <BotonFAColores1 backgroundColor="#48d597">
                  <i className="fas fa-pen-square"></i>
                  Modificar direccion
                </BotonFAColores1>

                <BotonFAColores1 backgroundColor="#f9423a">
                  <i className="fas fa-trash-alt"></i>
                  Eliminar direccion
                </BotonFAColores1>
              </div>
            </div>
            <hr />
            <div className="user__botones">
              <BotonFAColores1 backgroundColor="#69b3e7">
                <i className="fas fa-plus"></i>
                Agregar direccion
              </BotonFAColores1>
            </div>
          </div>
        </div>

        <hr />
        <div className="user__misPedidos">
          <h2 className="user__titulo2">Ultimos Pedidos</h2>
          {pedidos && (
            <>
              <table className="table table-bordered">
                <ContenidoTablaPedidos
                  id="555"
                  fecha="05/12/1998"
                  estado="En transito"
                  valor={100000}
                >
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Repellat mollitia, magni odio iure ex impedit inventore saepe,
                  non nihil minima soluta molestias officiis dignissimos ea sed
                  ipsam et quia quis.
                </ContenidoTablaPedidos>
                <ContenidoTablaPedidos
                  id="555"
                  fecha="05/12/1998"
                  estado="En transito"
                  valor={100000}
                >
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Repellat mollitia, magni odio iure ex impedit inventore saepe,
                  non nihil minima soluta molestias officiis dignissimos ea sed
                  ipsam et quia quis.
                </ContenidoTablaPedidos>

                <ContenidoTablaPedidos
                  id="555"
                  fecha="05/12/1998"
                  estado="En transito"
                  valor={100000}
                >
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Repellat mollitia, magni odio iure ex impedit inventore saepe,
                  non nihil minima soluta molestias officiis dignissimos ea sed
                  ipsam et quia quis.
                </ContenidoTablaPedidos>
              </table>
              <Link href="/user/orders" passHref>
                <div>
                  <BotonFAColores1 backgroundColor="#48d597">
                    Ver todos los pedidos
                  </BotonFAColores1>
                </div>
              </Link>
            </>
          )}
          {!pedidos && (
            <div className="WHITEBACKGROUND">
              <h4 className="TEXT1">No hay pedidos</h4>
            </div>
          )}
        </div>
      </div>
      <br />
    </>
  );
};

export default User;
