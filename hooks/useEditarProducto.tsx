import { APIURL } from '../utils/constantes';
import useActualizarImagenProducto from './useActualizarImagen';

interface productoProps {
	descripcion?: string | any;
	nombre: string;
	precio: number;
	categorias: Array<string>;
	cantidad: number;
	marca?: string;
	imagenes?: any; //fillist
	idProd: any;
}

const useEditarProducto = async ({
	nombre,
	precio,
	descripcion,
	categorias,
	cantidad,
	marca,
	imagenes,
	idProd,
}: productoProps) => {
	try {
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
		const response: any = await fetch(APIURL + 'productos/' + idProd, {
			method: 'PUT',
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
				msg: msg ?? 'Error al editar el producto contacta al administrador*',
			};
		}

		const responseData = await response.json();
		const idProducto = responseData.producto.id;
		const newUrl = responseData.producto.nombre_url;
		//no se requiere actualizar imagen
		if (!imagenes || imagenes.length === 0) {
			return { ok: true, msg: 'Actualizado con exito', newUrl };
		}
		const actualizarImgRes = await useActualizarImagenProducto(
			imagenes,
			idProducto
		);
		if (!actualizarImgRes.ok && responseData.ok) {
			return {
				ok: true,
				msg: 'Se actualizo el producto, pero no se pudo subir imagen.',
				type: 'noimage',
				newUrl,
			};
		} else if (responseData.ok) {
			return { ok: true, msg: 'Actualizado con exito*', newUrl };
		}
		return { ok: false, msg: responseData.msg };
	} catch (error) {
		return {
			ok: false,
			msg: 'Error Inesperado, contacta al administrador',
		};
	}
};

export default useEditarProducto;
