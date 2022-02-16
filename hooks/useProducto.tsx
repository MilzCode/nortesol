import { APIURL, NOMONGOIDKEY_DONOTCHANGE } from '../utils/constantes';

const useProducto = async (id: string, mongoId = false) => {
	//con esto nos evitamos que por alguna razon el id coincida con un mongo id siendo que es un nombre
	const busquedaPorNombre = mongoId ? '' : NOMONGOIDKEY_DONOTCHANGE;
	const response = await fetch(APIURL + 'productos/' + busquedaPorNombre + id);
	const data = await response.json();
	return data;
};

export default useProducto;
