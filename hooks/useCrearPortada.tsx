import { APIURL } from '../utils/constantes';

const useCrearPortada = async ({ nombre, descripcion, url, imagen }: any) => {
	try {
		const token = localStorage.getItem('tken');
		if (!token) {
			localStorage.removeItem('tken');
			window.location.replace('/');
			return;
		}

		let file = imagen.item(0);
		let formData = new FormData();
		formData.append('nombre', nombre);
		formData.append('descripcion', descripcion);
		formData.append('url', url);
		formData.append('files[]', file);
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
