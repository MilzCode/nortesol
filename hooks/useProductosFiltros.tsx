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
}: filtroProps) => {
	try {
		const response = await axios.get(APIURL + '/productos/search/productos', {
			params: {
				busqueda,
				cantidad,
				categorias,
				descuento_min,
				marcas,
				precio_min,
				precio_max,
				relevancia,
			},
		});

		console.log(response);
	} catch (error) {}
};

export default useProductosFiltros;
