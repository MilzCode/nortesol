import React from 'react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import useProducto from '../../hooks/useProducto';
import Volver from '../../components/general/Volver';
import ProductoHead from '../../components/venta/ProductoHead';
import ProductoBody from '../../components/venta/ProductoBody';
import ProductoRelacionados from '../../components/venta/ProductoRelacionados';
import EditarProducto from '../../components/general/EditarProductoBTN';

const ProductoVer = ({me}: any) => {
	const router = useRouter();
	const [producto, setProducto] = useState<any>(false);
	const [cantidad, setCantidad] = useState(2);
	const { id } = router.query;
	useEffect(() => {
		//@ts-ignore
		useProducto(id)
			.then((res) => {
				if (!res.ok) {
					window.location.href = '/';
				}
				setProducto(res.producto);
				console.log(res.producto);
			})
			.catch(() => {
				window.location.href = '/';
			});
	}, []);
	return (
		<>
			{producto ? (
				<>
					<Volver />
					{me.admin && <EditarProducto />}
					<h1 className="producto__titulo">{producto.nombre}</h1>
					<ProductoHead
						precio={producto.precio}
						cantidadLlevada={cantidad}
						imagenes={producto.detalle_producto.imagenes}
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
