import React, { useEffect } from 'react';
import BotonFAColores1 from '../../components/general/BotonFAColores1';
import Volver from '../../components/general/Volver';
import Link from 'next/link';
import Wredirect from '../../helpers/Wredirect';

const success = () => {
	useEffect(() => {}, []);
	return (
		<>
			<Volver url="/" />
			<div className="buyResp">
				<h1 className="producto__titulo">Gracias por tu compra</h1>
				<p className="buyResp__msg">
					Hemos recibido tu pago y estamos procesando tu pedido.
					<br />
					Puede ver más información del pedido en la sección últimos pedidos
					de&nbsp;
					<Link href="/user#ultimospedidos" passHref>
						<a className="LINK">“Mi Cuenta”.</a>
					</Link>
				</p>
				<Link href="/" passHref>
					<BotonFAColores1>Ir a la página principal</BotonFAColores1>
				</Link>
			</div>
		</>
	);
};

export default success;
