import React, { useState, useEffect } from 'react';
import Paginador from '../general/Paginador';
import Volver from '../general/Volver';
import Filtro from '../search/Filtro';
import ProductoVistaMiniatura from '../venta/ProductoVistaMiniatura';
import GetMarcas from '../../helpers/GetMarcas';
import GetCategorias from '../../helpers/GetCategorias';
import Capitalize from '../../utils/capitalize';
import GetProductos from '../../helpers/GetProductos';
import { SEPARADOR } from '../../utils/constantes';
const Search = ({ desabilitados }: any) => {
	const rangoPrecios = [0, 1000000];
	const [first, setFirst] = useState(true);
	const [pagina, setPagina] = useState(1);
	const [maxPag, setMaxPag] = useState(1);
	const [filtroCampos, setFiltroCampos] = useState({});
	const [queryUrl, setQueryUrl] = useState('');
	const [productos, setProductos] = useState([]);
	const [cargandoProductos, setCargandoProductos] = useState(false);
	const [marcas, setMarcas] = useState([]);
	const [categorias, setCategorias] = useState([]);
	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		GetMarcas()
			.then((res) => {
				const marcas_ = res.map((m: any) => {
					return { value: m, label: Capitalize(m) };
				});
				setMarcas(marcas_);
			})
			.catch((err) => {});
		GetCategorias()
			.then((res) => {
				const categorias_ = res.map((c: any) => {
					return { value: c, label: Capitalize(c) };
				});
				setCategorias(categorias_);
			})
			.catch((err) => {});

		const queryString = window.location.search;
		const urlParams = new URLSearchParams(queryString);
		const categoriasURL = urlParams
			.get('categorias')
			?.split(SEPARADOR)
			.filter((c: any) => !!c);
		const marcasURL = urlParams
			.get('marcas')
			?.split(SEPARADOR)
			.filter((m: any) => !!m);

		let busqueda = urlParams.get('busqueda') || '';
		const filtroSearch = {
			busqueda,
			// marcas: marcasURL || undefined,
			// categorias: categoriasURL || undefined,
			// precio_min: Number(urlParams.get('precio_min')) || undefined,
			// precio_max: Number(urlParams.get('precio_max')) || undefined,
			// page: Number(urlParams.get('page')) || 1,
		};
		GetProductos(filtroSearch, desabilitados)
			.then((res) => {
				setProductos(res.productos.docs);
				setMaxPag(res.productos.totalPages);
				setLoaded(true);
			})
			.catch((err) => {
				setLoaded(true);
			});
	}, []);

	useEffect(() => {
		if (!first) {
			setCargandoProductos(true);
			GetProductos({ ...filtroCampos, page: pagina }, desabilitados)
				.then((res) => {
					if (!res.ok) {
						setCargandoProductos(false);
						return;
					}
					setProductos(res.productos.docs);
					setCargandoProductos(false);
				})
				.catch(() => {
					setProductos([]);
					setCargandoProductos(false);
				});
		}
		setFirst(false);
	}, [pagina, filtroCampos]);

	return (
		<>
			<Volver />
			<br />
			<Filtro
				onFilter={(f, q) => {
					setFiltroCampos(f);
					setQueryUrl(q);
				}}
				marcas={marcas}
				categorias={categorias}
				precios={rangoPrecios}
				isLoading={cargandoProductos}
			/>
			<br />
			<div className="search__mensajeEncontrados">
				<h2>Productos encontrados</h2>
				{!loaded && <p>Buscando...</p>}
				{productos && loaded && productos.length == 0 && (
					<p>Sin resultados...</p>
				)}
			</div>
			<br />
			<div className="index__productos">
				{productos &&
					productos.map((p: any, i: any) => (
						<ProductoVistaMiniatura
							nombre={p.nombre}
							nombre_url={p.nombre_url}
							precio={p.precio}
							imagen={p.imagen}
							key={i}
							descuento={p.descuento}
							desabilitado={desabilitados}
						/>
					))}
			</div>
			{loaded ? (
				<Paginador
					maxPagina={maxPag}
					setPagina={setPagina}
					pagina={pagina}
					loading={cargandoProductos}
				/>
			) : (
				''
			)}
		</>
	);
};

export default Search;
