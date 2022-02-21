import { APIURL } from '../utils/constantes';

const useActualizarImagenProducto = async (imagenes: any, id: string) => {
	let formData = new FormData();
	for (let i = 0; i < imagenes.length; i++) {
		let file = imagenes.item(i);
		formData.append('files[]', file);
	}
	const token = localStorage.getItem('tken');
	if (!token) {
		return {
			ok: false,
			msg: 'No hay token?',
		};
	}
	const res = await fetch(APIURL + 'images/' + id, {
		method: 'PUT',
		headers: {
			'x-token': token,
		},
		body: formData,
	});
	const data = await res.json();
	return res;
};

export default useActualizarImagenProducto;
