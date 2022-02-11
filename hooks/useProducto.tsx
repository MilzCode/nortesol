import { APIURL } from '../utils/constantes';

const useProducto = async (id: string) => {
	const response = await fetch(APIURL + 'productos/' + id);
	const data = await response.json();
	return data;
};

export default useProducto;
