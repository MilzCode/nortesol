import { APIURL } from '../utils/constantes';

interface ActualizarImagenProps {
	imagenes: any;
	id: string;
}

const EditarImagenProducto = async (
	{ imagenes, id }: ActualizarImagenProps,
	desabilitado = false
) => {
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
	const urlApiProductos = !desabilitado
		? 'productos'
		: 'productos_desabilitados';
	const res = await fetch(APIURL + urlApiProductos + '/' + id, {
		method: 'PUT',
		headers: {
			'x-token': token,
		},
		body: formData,
	});
	const data = await res.json();
	return res;
};

export default EditarImagenProducto;
