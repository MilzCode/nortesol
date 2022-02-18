import { APIURL, MAXPRODUCTOSCARRITO } from '../utils/constantes';
import Axios from 'axios';

interface productosProps {
	page?: number;
	limit?: number;
	cat?: string;
	find_prod?: Array<string>;
}

/**
 * cuando se envia find_prod se devuelven todos los productos que se encuentren en esas id.
 */
const useProductos = async ({
	page,
	limit,
	cat,
	find_prod,
}: productosProps) => {
	try {
		if (find_prod && find_prod.length === 0) {
			return { ok: true, productos: { totalDocs: 0, docs: [] } };
		} else if (find_prod && find_prod.length > MAXPRODUCTOSCARRITO) {
			return {
				ok: false,
				productos: { totalDocs: 0 },
				msg: 'El carrito lleva demasiados productos',
			};
		}
		const response = await Axios.get(APIURL + 'productos', {
			params: {
				page,
				limit,
				cat,
				find_prod,
			},
		});

		const data = await response.data;

		return data;
	} catch (error) {
		return { ok: false, productos: { totalDocs: 0 } };
	}
};

export default useProductos;
