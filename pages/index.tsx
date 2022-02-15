import type { NextPage } from 'next';
import Head from 'next/head';
import Destacados from '../components/index/Destacados';
import Secciones from '../components/index/Secciones';
import Siguenos from '../components/index/Siguenos';
import Paginador from '../components/general/Paginador';
import ProductoVistaMiniatura from '../components/venta/ProductoVistaMiniatura';
import { useEffect, useState } from 'react';
import useProductos from '../hooks/useProductos';

const Home: NextPage = () => {
	const [pagina, setPagina] = useState(1);
	const [maxPag, setMaxPag] = useState(1);
	const [productos, setProductos] = useState([]);
	const [loaded, setLoaded] = useState(false);
	const [first, setFirst] = useState(true);
	useEffect(() => {
		if (first) {
			useProductos({})
				.then((res) => {
					setFirst(false);
					setMaxPag(res.productos.totalPages);
					setProductos(res.productos.docs);
					setLoaded(true);
				})
				.catch(() => {});
		} else {
			useProductos({ page: pagina })
				.then((res) => {
					setProductos(res.productos.docs);
				})
				.catch(() => {});
		}
	}, [pagina]);

	return (
		<>
			<Head>
				<meta name="Descripcion" content="Libreria nortesol" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<h1 className="TEXTINVISIBLE">Libreria Nortesol Pagina principal</h1>
			<Destacados />
			<Siguenos />
			<div className="index__productos">
				<Secciones />
				{productos.map((p: any) => (
					<ProductoVistaMiniatura
						nombre={p.nombre}
						nombre_url={p.nombre_url}
						precio={p.precio}
						imagen={p.imagen}
					/>
				))}
			</div>
			{loaded ? (
				<Paginador maxPagina={maxPag} setPagina={setPagina} pagina={pagina} />
			) : (
				''
			)}
		</>
	);
};

export default Home;
