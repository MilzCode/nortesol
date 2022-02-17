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
import useAñadirProductoCarrito from '../../hooks/useAñadirProductoCarrito';
import useCantidadProductoCarrito from '../../hooks/useCantidadProductoCarrito';

const ProductoVer = ({ me }: any) => {
	const router = useRouter();
	const [producto, setProducto] = useState<any>(false);
	const [cantidad, setCantidad] = useState(0);
	const [cantLlevada, setCantLlevada] = useState(0);
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
					setCantLlevada(useCantidadProductoCarrito(res.producto.nombre_url));
				})
				.catch(() => {
					window.location.href = '/';
					return;
				});
	}, [id]);
	const añadirAlCarrito = () => {
		const nuevaCant = useAñadirProductoCarrito({
			p: producto.nombre_url,
			c: cantidad,
			maxc: producto.detalle_producto.cantidad,
		});
		//@ts-ignore
		setCantLlevada(nuevaCant);
	};
	return (
		<>
			{producto ? (
				<>
					{me.admin && <EditarProductoBTN id_edit_prod={producto.nombre_url} />}
					<Volver />
					<h1 className="producto__titulo">{Capitalize(producto.nombre)}</h1>
					<ProductoHead
						precio={producto.precio}
						imagenes={producto.detalle_producto.imagenes}
						cantidad_disponible={producto.detalle_producto.cantidad}
						cantidad_carrito={cantLlevada}
						irCarritoUrl="/carrito"
						onAddCarrito={añadirAlCarrito}
						onChangeCantidad={(c: number) => {
							setCantidad(c);
						}}
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
