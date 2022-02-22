import { APIURL } from '../utils/constantes';
import EditarImagenProducto from './EditarImagenProducto';

interface productoProps {
	descripcion?: string | any;
	nombre: string;
	precio: number;
	categorias: Array<string>;
	cantidad: number;
	marca?: string;
	imagenes?: any; //fillist
}

const CrearProducto = async ({
	nombre,
	precio,
	descripcion,
	categorias,
	cantidad,
	marca,
	imagenes,
}: productoProps) => {
	try {
		if (!imagenes || imagenes.length === 0) {
			console.log('Hace falta una imagen');
			return {
				ok: false,
				msg: 'Hace falta almenos 1 imagen',
				type: 'minimagen',
			};
		}
		const dataFetch = {
			nombre,
			precio,
			descripcion,
			categorias,
			cantidad,
			marca,
		};
		const token = localStorage.getItem('tken');
		if (!token) {
			return {
				ok: false,
				msg: 'No hay token?',
			};
		}
		const response = await fetch(APIURL + 'productos', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'x-token': token,
			},
			body: JSON.stringify(dataFetch),
		});

		if (!response.ok) {
			const msg = (await response.json()).msg;

			return {
				ok: false,
				msg: msg ?? 'Error al crear el producto contacta al administrador*',
			};
		}

		const responseData = await response.json();
		const idProducto = responseData.producto.id;
		const actualizarImgRes = await EditarImagenProducto({
			imagenes,
			id: idProducto,
		});
		if (!actualizarImgRes.ok && responseData.ok) {
			return {
				ok: true,
				msg: 'Se subio el producto, pero no se pudo subir imagen.',
				type: 'noimage',
			};
		} else if (responseData.ok) {
			return { ok: true, msg: 'Subido con exito' };
		}
		return { ok: false, msg: responseData.msg };
	} catch (error) {
		return {
			ok: false,
			msg: 'Error Inesperado, contacta al administrador',
		};
	}
};

export default CrearProducto;
