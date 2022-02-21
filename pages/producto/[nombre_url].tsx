import { useRouter } from 'next/router';
import React from 'react';
import { useEffect, useState } from 'react';
import Volver from '../../components/general/Volver';
import ProductoHead from '../../components/venta/ProductoHead';
import ProductoBody from '../../components/venta/ProductoBody';
import ProductoRelacionados from '../../components/venta/ProductoRelacionados';
import EditarProductoBTN from '../../components/general/EditarProductoBTN';
import Capitalize from '../../utils/capitalize';
import useAñadirProductoCarrito from '../../hooks/useAñadirProductoCarrito';
import useCantidadProductoCarrito from '../../hooks/useCantidadProductoCarrito';
import VentanaModal from '../../components/general/VentanaModal';
import BotonFAColores1 from '../../components/general/BotonFAColores1';
import useProductos from '../../hooks/useProductos';
import Link from 'next/link';
import wredirect from '../../helpers/wredirect';

const producto = ({ me }: any) => {
	const router = useRouter();
	const { nombre_url } = router.query;

	const [producto, setProducto] = useState<any>(false);
	const [cantidad, setCantidad] = useState(1);
	const [cantLlevada, setCantLlevada] = useState(0);
	const [relacionados, setRelacionados] = useState(0);
	const [carritoLleno, setCarritoLleno] = useState(false);
	useEffect(() => {
		nombre_url &&
			//@ts-ignore
			useProductos({ nombre_url })
				.then((res) => {
					if (!res.ok) {
						wredirect();
						return;
					}
					setProducto(res.producto);
					setCantLlevada(useCantidadProductoCarrito(res.producto.pid));
					//seleccionando una categoria al azar
					const categorias_names = res.producto.categorias_names;
					useProductos({ limit: 7, categorias: categorias_names })
						.then((resRel) => {
							const prodRelacionados = resRel.productos.docs.filter(
								(p: any) => p.nombre_url != res.producto.nombre_url
							);
							setRelacionados(prodRelacionados);
						})
						.catch();
				})
				.catch(() => {
					wredirect();
					return;
				});
	}, [nombre_url]);
	const añadirAlCarrito = () => {
		const nuevaCant = useAñadirProductoCarrito({
			p: producto.pid,
			c: cantidad,
			maxc: producto.cantidad,
		});
		//@ts-ignore
		if (nuevaCant === -1) {
			setCarritoLleno(true);
			return;
		}
		//@ts-ignore
		setCantLlevada(nuevaCant);
	};
	return (
		<>
			{producto ? (
				<>
					{me.admin && <EditarProductoBTN id_edit_prod={producto.nombre_url} />}
					<Volver cantPagesBack={2} />
					<h1 className="producto__titulo">{Capitalize(producto.nombre)}</h1>
					<ProductoHead
						precio={producto.precio}
						imagenes={producto.detalle_producto.imagenes}
						cantidad_disponible={producto.cantidad}
						cantidad_carrito={cantLlevada}
						irCarritoUrl="/carrito"
						onAddCarrito={añadirAlCarrito}
						onChangeCantidad={(c: number) => {
							setCantidad(c);
						}}
					/>
					<ProductoBody contenido={producto.detalle_producto.descripcion} />
					<ProductoRelacionados productosRel={relacionados} />
					<br />
					{carritoLleno && (
						<VentanaModal
							titulo={'Carrito Lleno!'}
							onClose={() => {
								setCarritoLleno(false);
							}}
						>
							Ya llevas demasiados productos en el carrito.
							<br />
							<br />
							<Link passHref href="/carrito">
								<BotonFAColores1 backgroundColor="#f9423a">
									<i className="fas fa-shopping-cart"></i>
									Ir al carrito
								</BotonFAColores1>
							</Link>
						</VentanaModal>
					)}
				</>
			) : (
				<p className="CENTERABSOLUTE">Cargando...</p>
			)}
		</>
	);
};

export default producto;
