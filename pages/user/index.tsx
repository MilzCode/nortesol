import React, { useEffect } from "react";
import BotonFAColores1 from "../../components/general/BotonFAColores1";
import Volver from "../../components/general/Volver";
import ContenidoTablaPedidos from "../../components/user/ContenidoTablaPedidos";
import Link from "next/link";

const User = ({ me }: any) => {
  const pedidos = true;

  return (
    <>
      <Volver />
      <div className="user">
        <h2 className="user__titulo">Hola, {me.nombre}</h2>
        <hr />
        <div className="user__misDatos">
          <h3 className="user__misDatosTitulo">Mis Datos</h3>
          <div className="user__misDatosContenido">
            <p>Nombre: {me.nombre}</p>
            <p>Rut: {me.rut}</p>
            <p>Celular: +56 {me.celular}</p>
            <p>Contraseña: ********************</p>
          </div>
          <Link href="/user/edit" passHref>
            <div>
              <BotonFAColores1 backgroundColor="#48d597">
                Modificar mis datos
              </BotonFAColores1>
            </div>
          </Link>
        </div>
        <hr />
        {/* <div className="user__misDirecciones">
          <h3 className="user__misDireccionesTitulo">Mis Direcciones</h3>
          <div className="user__misDireccionesContenido">
            <div className="user__direccion">
              <h4>Direccion 1</h4>
              <p>Region: Metropolitana</p>
              <p>Comuna: Las Condes</p>
              <p>Direccion: Avenida Siempreviva 123</p>
              <div className="user__botones">
                <Link href="/user/edit-address" passHref>
                  <div>
                    <BotonFAColores1 backgroundColor="#48d597">
                      <i className="fas fa-pen-square"></i>
                      Modificar direccion
                    </BotonFAColores1>
                  </div>
                </Link>

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
              <p>Direccion: Avenida Siempreviva Siempreviva 123</p>
              <div className="user__botones">
                <Link href="/user/edit-address" passHref>
                  <div>
                    <BotonFAColores1 backgroundColor="#48d597">
                      <i className="fas fa-pen-square"></i>
                      Modificar direccion
                    </BotonFAColores1>
                  </div>
                </Link>
                <BotonFAColores1 backgroundColor="#f9423a">
                  <i className="fas fa-trash-alt"></i>
                  Eliminar direccion
                </BotonFAColores1>
              </div>
            </div>
            <hr />
            <div className="user__botones">
              <Link href="/user/add-address" passHref>
                <div>
                  <BotonFAColores1 backgroundColor="#69b3e7">
                    <i className="fas fa-plus"></i>
                    Agregar direccion
                  </BotonFAColores1>
                </div>
              </Link>
            </div>
          </div>
        </div> */}
        <div className="user__misDirecciones">
          <h3 className="user__misDireccionesTitulo">Mi Dirección</h3>
          <div className="user__misDireccionesContenido">
            <div className="user__direccion">
              <h4>Dirección de envio</h4>
              <p>Region: {me.ubicacion.dir1.region}</p>
              <p>Ciudad: {me.ubicacion.dir1.ciudad}</p>
              <p>Direccion: {me.ubicacion.dir1.direccion}</p>
              <div className="user__botones">
                <Link href="/user/edit-address" passHref>
                  <div>
                    <BotonFAColores1 backgroundColor="#48d597">
                      <i className="fas fa-pen-square"></i>
                      Modificar direccion
                    </BotonFAColores1>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <hr />
        <div className="user__misPedidos">
          <h2 className="user__titulo2">Ultimos Pedidos</h2>
          {pedidos && (
            <>
              <table className="table table-bordered">
                <tbody>
                  <ContenidoTablaPedidos
                    id="555"
                    fecha="05/12/1998"
                    estado="En transito"
                    valor={100000}
                  >
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Repellat mollitia, magni odio iure ex impedit inventore
                    saepe, non nihil minima soluta molestias officiis
                    dignissimos ea sed ipsam et quia quis.
                  </ContenidoTablaPedidos>
                  <ContenidoTablaPedidos
                    id="555"
                    fecha="05/12/1998"
                    estado="En transito"
                    valor={100000}
                  >
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Repellat mollitia, magni odio iure ex impedit inventore
                    saepe, non nihil minima soluta molestias officiis
                    dignissimos ea sed ipsam et quia quis.
                  </ContenidoTablaPedidos>

                  <ContenidoTablaPedidos
                    id="555"
                    fecha="05/12/1998"
                    estado="En transito"
                    valor={100000}
                  >
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Repellat mollitia, magni odio iure ex impedit inventore
                    saepe, non nihil minima soluta molestias officiis
                    dignissimos ea sed ipsam et quia quis.
                  </ContenidoTablaPedidos>
                </tbody>
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
