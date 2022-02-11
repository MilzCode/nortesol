import { APIURL } from '../utils/constantes';
import useActualizarImagenProducto from './useActualizarImagen';

interface productoProps {
	descripcion?: string | any;
	titulo: string;
	precio: number;
	categoria: string;
	cantidad: number;
	imagenes?: any; //fillist
}

const useCrearProducto = async (data: productoProps) => {
	try {
		if (!data.imagenes || data.imagenes.length === 0) {
			console.log('Hace falta una imagen');
			return {
				ok: false,
				msg: 'Hace falta almenos 1 imagen',
				type: 'minimagen',
			};
		}
		console.log(data.descripcion);
		const dataFetch = {
			nombre: data.titulo,
			precio: data.precio,
			descripcion: data.descripcion,
			categorias: data.categoria,
			cantidad: data.cantidad,
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
				msg: msg ?? 'Error al crear el producto contacta al administrador',
			};
		}

		const responseData = await response.json();
		const idProducto = responseData.producto.id;
		console.log('se añadio', idProducto);
		const actualizarImgRes = await useActualizarImagenProducto(
			data.imagenes,
			idProducto
		);
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

export default useCrearProducto;
