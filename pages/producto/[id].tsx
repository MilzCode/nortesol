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
import getRandomInt from '../../utils/random-int';
import useProductos from '../../hooks/useProductos';
import VentanaModal from '../../components/general/VentanaModal';
import BotonFAColores1 from '../../components/general/BotonFAColores1';

const ProductoVer = ({ me }: any) => {
	const router = useRouter();
	const [producto, setProducto] = useState<any>(false);
	const [cantidad, setCantidad] = useState(1);
	const [cantLlevada, setCantLlevada] = useState(0);
	const [relacionados, setRelacionados] = useState(0);
	const [carritoLleno, setCarritoLleno] = useState(false);
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
					setCantLlevada(useCantidadProductoCarrito(res.producto.pid));
					//seleccionando una categoria al azar
					const categoriaCantidad = res.producto.categorias.length;
					const categoriaRandom =
						res.producto.categorias[getRandomInt(0, categoriaCantidad)]._id;

					useProductos({ limit: 6, cat: categoriaRandom })
						.then((resRel) => {
							const prodRelacionados = resRel.productos.docs.filter(
								(p: any) => p.nombre_url != res.producto.nombre_url
							);
							setRelacionados(prodRelacionados);
						})
						.catch();
				})
				.catch(() => {
					window.location.href = '/';
					return;
				});
	}, [id]);
	const añadirAlCarrito = () => {
		const nuevaCant = useAñadirProductoCarrito({
			p: producto.pid,
			c: cantidad,
			maxc: producto.detalle_producto.cantidad,
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
					<Volver url="/" />
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
							<BotonFAColores1
								backgroundColor="#f9423a"
								onClick={() => {
									router.push('/carrito');
								}}
							>
								<i className="fas fa-shopping-cart"></i>
								Ir al carrito
							</BotonFAColores1>
						</VentanaModal>
					)}
				</>
			) : (
				<p className="CENTERABSOLUTE">Cargando...</p>
			)}
		</>
	);
};

export default ProductoVer;