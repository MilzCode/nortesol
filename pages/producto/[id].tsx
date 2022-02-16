import React from 'react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import useProducto from '../../hooks/useProducto';
import Volver from '../../components/general/Volver';
import ProductoHead from '../../components/venta/ProductoHead';
import ProductoBody from '../../components/venta/ProductoBody';
import ProductoRelacionados from '../../components/venta/ProductoRelacionados';
import EditarProductoBTN from '../../components/general/EditarProductoBTN';
import Capitalize from '../../utils/capitalize';

const ProductoVer = ({ me }: any) => {
	const router = useRouter();
	const [producto, setProducto] = useState<any>(false);
	const [cantidad, setCantidad] = useState(0);
	const { id } = router.query;
	useEffect(() => {
		id &&
			//@ts-ignore
			useProducto(id)
				.then((res) => {
					if (!res.ok) {
						router.push('/');
						return;
					}
					setProducto(res.producto);
				})
				.catch(() => {
					window.location.href = '/';
					return;
				});
	}, [id]);
	return (
		<>
			{producto ? (
				<>
					<Volver />
					{me.admin && <EditarProductoBTN id_edit_prod={producto.nombre_url} />}
					<h1 className="producto__titulo">{Capitalize(producto.nombre)}</h1>
					<ProductoHead
						precio={producto.precio}
						imagenes={producto.detalle_producto.imagenes}
						cantidad_disponible={producto.detalle_producto.cantidad}
						cantidad_carrito={0}
					/>
					<ProductoBody contenido={producto.detalle_producto.descripcion} />
					<hr />
					<ProductoRelacionados />
					<br />
				</>
			) : (
				<p className="CENTERABSOLUTE">Cargando...</p>
			)}
		</>
	);
};

export default ProductoVer;
