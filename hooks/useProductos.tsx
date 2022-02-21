import axios from 'axios';
import React from 'react';
import { APIURL } from '../utils/constantes';

interface filtroProps {
	nombre_url?: string;
	id?: string;
	///
	busqueda?: string;
	cantidad?: number;
	categorias?: Array<string>;
	descuento_min?: number;
	marcas?: Array<string>;
	precio_min?: number;
	precio_max?: number;
	relevancia?: number;
	page?: number;
	limit?: number;
	sortDescuentoDesc?: boolean;
	sortFechaDesc?: boolean;
	sortRelevanciaDesc?: boolean;
	sortPrecio?: boolean;
	sortPrecioDesc?: boolean; //mayor a menor
	sortNombreDesc?: boolean;
	find_productos_pids?: Array<string>;
}

const useProductos = async (
	{ ...props }: filtroProps,
	desabilitados = false
) => {
	try {
		const urlApiProductos = !desabilitados
			? 'productos'
			: 'productos_desabilitados';

		const response = await axios.get(APIURL + urlApiProductos, {
			params: {
				...props,
			},
		});
		const data = await response.data;
		return data;
	} catch (error) {
		window.location.href = '/';
		return { ok: false, productos: { totalDocs: 0 } };
	}
};

export default useProductos;
