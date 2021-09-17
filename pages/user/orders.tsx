import React from "react";
import Paginador from "../../components/general/Paginador";
import Volver from "../../components/general/Volver";
import ContenidoTablaPedidos from "../../components/user/ContenidoTablaPedidos";

const Orders = () => {
  const pedidos = true;
  const [pagina, setPagina] = React.useState(1);
  const maxPagina = 10;
  return (
    <>
      <Volver />
      <div className="user__misPedidos">
        <h2 className="user__titulo2">Mis Pedidos</h2>
        {/* <br />
        <form className="user__search">
          <input
            type="text"
            placeholder="Buscar"
          />
          <button>Buscar</button>
        </form>
        <br /> */}
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
              </tbody>
            </table>
          </>
        )}
        {!pedidos && (
          <div className="WHITEBACKGROUND">
            <h4 className="TEXT1">No hay pedidos</h4>
          </div>
        )}
        <Paginador
          maxPagina={maxPagina}
          pagina={pagina}
          setPagina={setPagina}
        />
      </div>
      <br />
    </>
  );
};

export default Orders;
