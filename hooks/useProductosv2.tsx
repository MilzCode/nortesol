import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { APIURL } from '../utils/constantes';
import wredirect from '../helpers/wredirect';

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

const useProductosV2 = async (
	{ ...props }: filtroProps,
	desabilitados = false
) => {
	const [productos, setProductos] = useState<any>(null);
	const [ok, setOk] = useState(false);
	const [loaded, setLoaded] = useState(false);
	const urlApiProductos = !desabilitados
		? 'productos'
		: 'productos_desabilitados';
	useEffect(() => {}, []);
	return [productos, ok, loaded];
};

export default useProductosV2;
