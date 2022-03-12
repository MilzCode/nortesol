import axios from 'axios';
import { APIURL } from '../utils/constantes';

const NuevoPagoMercadoPago = async () => {
	const token = localStorage.getItem('tken');
	if (!token) {
		return {
			ok: false,
			msg: 'No se encontro token',
		};
	}
	const carritoObj = JSON.parse(localStorage.getItem('carrito') || '[]');
	if (!carritoObj || carritoObj.length === 0) {
		return {
			ok: false,
			msg: 'No se encontro carrito',
		};
	}
	const resp = await axios.post(
		APIURL + 'mercadopago',
		{
			productosAndQty: carritoObj,
		},
		{
			headers: {
				'x-token': token,
			},
		}
	);
    return resp.data;
};

export default NuevoPagoMercadoPago;
