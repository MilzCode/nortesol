import { APIURL } from '../utils/constantes';
import Axios from 'axios';

interface productosProps {
	page?: number;
	limit?: number;
	cat?: string;
}

const useProductos = async ({ page, limit, cat }: productosProps) => {
	try {
		const response = await Axios.get(APIURL + 'productos', {
			params: {
				page,
				limit,
				cat,
			},
		});

		const data = await response.data;

		return data;
	} catch (error) {
		return false;
	}
};

export default useProductos;
