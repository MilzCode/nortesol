import axios from 'axios';
import React from 'react';
import { APIURL } from '../utils/constantes';

interface filtroProps {
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

const useProductosFiltros = async ({
	busqueda,
	cantidad,
	categorias,
	descuento_min,
	marcas,
	precio_min,
	precio_max,
	relevancia,
	find_productos_pids,
	page,
	limit,
	//solo se acepta un sort a la vez por temas de rendimiento, si se envia más de uno solo funcionara uno.
	//por temas de rendimiento es mejor no usarlos.
	sortDescuentoDesc,
	sortFechaDesc,
	sortRelevanciaDesc,
	sortPrecio,
	sortPrecioDesc,
	sortNombreDesc,
}: filtroProps) => {
	try {
		const response = await axios.get(APIURL + 'productos/search/productos', {
			params: {
				busqueda,
				cantidad,
				categorias,
				descuento_min,
				marcas,
				precio_min,
				precio_max,
				relevancia,
				find_productos_pids,
				page,
				limit,
				sortDescuentoDesc,
				sortFechaDesc,
				sortRelevanciaDesc,
				sortPrecio,
				sortPrecioDesc,
				sortNombreDesc,
			},
		});
		const data = await response.data;
		return data;
	} catch (error) {
		return { ok: false, productos: { totalDocs: 0 } };
	}
};

export default useProductosFiltros;
