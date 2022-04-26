import type { NextPage } from 'next';
import Head from 'next/head';
import Destacados from '../components/index/Destacados';
import Secciones from '../components/index/Secciones';
import Siguenos from '../components/index/Siguenos';
import ProductoVistaMiniatura from '../components/venta/ProductoVistaMiniatura';
import { useEffect, useState } from 'react';
import GetProductos from '../helpers/GetProductos';
import GetPortadas from '../helpers/GetPortadas';
import GetAnuncios from '../helpers/GetAnuncios';
import Anuncio from '../components/general/Anuncio';
import { APIURL } from '../utils/constantes';

const cantidadProductosSeccion = 16;

const Home: NextPage = ({
	productosDescuentosInit = null,
	productosNovedadesInit = null,
	portadasInit = null,
	keyTest,
}: any) => {
	const [portadas, setPortadas] = useState<any>(portadasInit);
	const [anuncio, setAnuncio] = useState({
		nombre: '',
		descripcion: '',
		url: '',
		url_name: '',
		imagen: '',
		loadAnuncio: false,
		aid: '',
	});
	const [productos, setProductos] = useState(productosDescuentosInit);
	const [productosNovedades, setProductosNovedades] = useState(
		productosNovedadesInit
	);
	const [seccion, setSeccion] = useState('descuentos');

	useEffect(() => {
		if (portadasInit) return;
		GetPortadas()
			.then((res) => {
				setPortadas(res.portadas);
			})
			.catch();
	}, []);

	useEffect(() => {
		GetAnuncios()
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
		if (productosDescuentosInit && productosNovedadesInit) return;
		GetProductos({
			sortQuery: { field: 'porcentaje_descuento', sort: -1 },
			limit: cantidadProductosSeccion,
		})
			.then((res) => {
				setProductos(res.productos.docs);
			})
			.catch(() => {});

		GetProductos({
			sortQuery: { field: 'created_at', sort: -1 },
			limit: cantidadProductosSeccion,
		})
			.then((res) => {
				setProductosNovedades(res.productos.docs);
			})
			.catch(() => {});
	}, []);

	const handdleSeccion = (seccion: string) => {
		setSeccion(seccion);
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
			<h1>{keyTest}</h1>
			{/* <h1 className="TEXTINVISIBLE">Libreria Nortesol Pagina principal</h1> */}
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
							porcentaje_descuento={p.porcentaje_descuento}
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
							porcentaje_descuento={p.porcentaje_descuento}
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
					timeCloseMin={5}
				/>
			)}
		</>
	);
};

export default Home;

export async function getStaticProps() {
	try {
		const fetchOptions = {
			method: 'GET',
			headers: {
				origin_sv: process.env.ORIGIN_SV_KEY || '',
			},
		};
		const productosDescuentosReq = fetch(
			APIURL +
				'productos?' +
				'sortQuery=%7B%22field%22:%22porcentaje_descuento%22,%22sort%22:-1%7D&limit=16',

			fetchOptions
		);

		const productosNovedadesReq = fetch(
			APIURL +
				'productos?' +
				'?sortQuery=%7B%22field%22:%22created_at%22,%22sort%22:-1%7D&limit=16',
			fetchOptions
		);

		const portadasReq = fetch(APIURL + 'portadas', fetchOptions);

		const respuestas = await Promise.all([
			productosDescuentosReq,
			productosNovedadesReq,
			portadasReq,
		]);

		const [
			productosDescuentos,
			productosNovedades,
			portadas,
		] = await Promise.all(respuestas.map((r) => r.json()));

		return {
			props: {
				productosDescuentosInit: productosDescuentos.productos.docs,
				productosNovedadesInit: productosNovedades.productos.docs,
				portadasInit: portadas.portadas,
				keyTest: process.env.ORIGIN_SV_KEY || 'nodata',
			},
		};
	} catch (error) {
		return {
			props: { noLoad: true, keyTest: process.env.ORIGIN_SV_KEY || 'nodata' },
		};
	}
}
