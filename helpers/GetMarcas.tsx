import { APIURL } from '../utils/constantes';
const GetMarcas = async () => {
	try {
		const response = await fetch(APIURL + 'marcas');
		const responseData = await response.json();
		const marcas = responseData.marcas.map((m: any) => m.nombre);
		return marcas;
	} catch (error) {
		return {
			ok: false,
			msg: 'Error Inesperado, contacta al administrador',
		};
	}
};

export default GetMarcas;
