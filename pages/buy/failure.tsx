import React, { useEffect } from 'react';
import Link from 'next/link';
import Volver from '../../components/general/Volver';
import BotonFAColores1 from '../../components/general/BotonFAColores1';
import Wredirect from '../../helpers/Wredirect';

const failure = () => {
	useEffect(() => {
		// try {
		// 	const queryString = window.location.search;
		// 	const urlParams = new URLSearchParams(queryString);
		// 	const data = urlParams.get('external_reference') || '';
		// 	const external_reference = JSON.parse(data);
		// 	const dateNow = new Date();
		// 	const dateData = new Date(external_reference.date);
		// 	const diff = dateNow.getTime() - dateData.getTime();
		// 	console.log(diff);
		// 	if (diff > 300000) {
		// 		Wredirect('/');
		// 	}
		// } catch (error) {}
	}, []);
	return (
		<>
			<Volver url="/" />
			<div className="buyResp">
				<h1 className="producto__titulo">
					Hubo un problema al procesar el pago
				</h1>
				<p className="buyResp__msg">
					Lo sentimos, hubo un problema al procesar tu pago.
					<br />
					Tu compra no se ha realizado.
				</p>
				<Link href="/carrito" passHref>
					<a>
						<BotonFAColores1>Ir al Carrito</BotonFAColores1>
					</a>
				</Link>
			</div>
		</>
	);
};

export default failure;
