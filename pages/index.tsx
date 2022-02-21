import type { NextPage } from 'next';
import Head from 'next/head';
import Destacados from '../components/index/Destacados';
import Secciones from '../components/index/Secciones';
import Siguenos from '../components/index/Siguenos';
import ProductoVistaMiniatura from '../components/venta/ProductoVistaMiniatura';
import { useEffect, useState } from 'react';
import useProductos from '../hooks/useProductos';
import usePortadas from '../hooks/usePortadas';
import useAnuncios from '../hooks/useAnuncios';
import Anuncio from '../components/general/Anuncio';

const Home: NextPage = () => {
	const [portadas, setPortadas] = useState<any>(null);
	const [anuncio, setAnuncio] = useState({
		nombre: '',
		descripcion: '',
		url: '',
		url_name: '',
		imagen: '',
		loadAnuncio: false,
		aid: '',
	});
	const [productos, setProductos] = useState([]);
	const [productosNovedades, setProductosNovedades] = useState([]);
	const [seccion, setSeccion] = useState('descuentos');
	const cantidadProductosSeccion = 16;

	useEffect(() => {
		usePortadas()
			.then((res) => {
				setPortadas(res.portadas);
			})
			.catch();
	}, []);

	useEffect(() => {
		useAnuncios()
			.then((res) => {
				if (res.anuncios && res.anuncios.length > 0) {
					const {
						nombre,
						descripcion,
						url,
						url_name,
						imagen,
						aid,
					} = res.anuncios[0];
					setAnuncio({
						nombre,
						descripcion,
						url,
						url_name,
						imagen,
						aid,
						loadAnuncio: true,
					});
				}
			})
			.catch((er) => {});
	}, []);

	useEffect(() => {
		useProductos({ sortDescuentoDesc: true, limit: cantidadProductosSeccion })
			.then((res) => {
				setProductos(res.productos.docs);
			})
			.catch(() => {});
	}, []);
	const handdleSeccion = (seccion: string) => {
		setSeccion(seccion);
		if (seccion == 'descuentos') {
		} else {
			useProductos({ sortFechaDesc: true, limit: cantidadProductosSeccion })
				.then((res) => {
					setProductosNovedades(res.productos.docs);
				})
				.catch(() => {});
		}
	};

	const haddleCloseAnuncio = () => {
		setAnuncio({ ...anuncio, loadAnuncio: false });
	};

	return (
		<>
			<Head>
				<meta name="Descripcion" content="Libreria nortesol" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<h1 className="TEXTINVISIBLE">Libreria Nortesol Pagina principal</h1>
			{portadas ? (
				<Destacados portadas={portadas} />
			) : (
				<>
					<br />
					<br />
					<br />
					<br />
					<br />
				</>
			)}
			<Siguenos />
			<div className="index__productos">
				<Secciones onSelect={handdleSeccion} />
				{productos &&
					seccion == 'descuentos' &&
					productos.map((p: any, i: any) => (
						<ProductoVistaMiniatura
							nombre={p.nombre}
							nombre_url={p.nombre_url}
							precio={p.precio}
							imagen={p.imagen}
							key={i}
						/>
					))}
				{productosNovedades &&
					seccion == 'novedades' &&
					productosNovedades.map((p: any, i: any) => (
						<ProductoVistaMiniatura
							nombre={p.nombre}
							nombre_url={p.nombre_url}
							precio={p.precio}
							imagen={p.imagen}
							key={i}
						/>
					))}
			</div>
			<br />
			{anuncio.loadAnuncio && (
				<Anuncio
					nombre={anuncio.nombre}
					descripcion={anuncio.descripcion}
					url={anuncio.url}
					url_name={anuncio.url_name}
					imagen={anuncio.imagen ? anuncio.imagen : ''}
					onClose={haddleCloseAnuncio}
					id={anuncio.aid}
					saveClose={true}
					timeCloseMin={7}
				/>
			)}
		</>
	);
};

export default Home;
