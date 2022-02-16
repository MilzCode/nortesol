import { APIURL } from '../utils/constantes';

const useCategorias = async () => {
	try {
		const response = await fetch(APIURL + 'categorias');
		const responseData = await response.json();
		const categorias = responseData.categorias.map((c: any) => c.nombre);
		return categorias;
	} catch (error) {
		return {
			ok: false,
			msg: 'Error Inesperado, contacta al administrador',
		};
	}
};

export default useCategorias;
