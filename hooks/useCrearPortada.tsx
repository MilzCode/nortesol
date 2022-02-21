import { APIURL } from '../utils/constantes';
import wredirect from '../helpers/wredirect';

const useCrearPortada = async ({ nombre, descripcion, url, imagen }: any) => {
	try {
		const token = localStorage.getItem('tken');
		if (!token) {
			localStorage.removeItem('tken');
			wredirect();
			return;
		}

		let formData = new FormData();
		nombre && formData.append('nombre', nombre);
		descripcion && formData.append('descripcion', descripcion);
		url && formData.append('url', url);
		let file = null;
		if (imagen && imagen.length > 0) {
			file = imagen.item(0);
			formData.append('files[]', file);
		} else {
			return { ok: false, msg: 'No selecciono ninguna imagen' };
		}

		const response = await fetch(APIURL + 'portadas', {
			method: 'POST',
			headers: {
				'x-token': token,
			},
			body: formData,
		});
		const data = await response.json();

		return data;
	} catch (error) {
		return { ok: false, msg: 'Error contacte con el administrador' };
	}
};

export default useCrearPortada;
