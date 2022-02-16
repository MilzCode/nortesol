import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import useProducto from '../../../hooks/useProducto';

const EditarProducto = ({ auth, me }: any) => {
	if (!auth || !me.admin) {
		window.location.href = '/';
		return null;
	}
	const router = useRouter();
	const [producto, setProducto] = useState<any>(false);
	const { id_edit_prod } = router.query;

	useEffect(() => {
		id_edit_prod &&
			//@ts-ignore
			useProducto(id_edit_prod)
				.then((res: { ok: false; producto: null }) => {
					if (!res.ok) {
						router.push('/');
						return;
					}
					//@ts-ignore
					let { nombre, precio, categorias, marca, cantidad } = res.producto;
					if (categorias) {
						categorias = categorias.map((categoria: any) => categoria.nombre);
					}
					//@ts-ignore
					const { descripcion, imagenes } = res.producto.detalle_producto;

					setProducto(res.producto);
				})
				.catch(() => {
					window.location.href = '/';
				});
	}, [id_edit_prod]);

	return <>{producto && <div>wena</div>}</>;
};

export default EditarProducto;
