import React, { useState, useEffect } from 'react';
import Paginador from '../general/Paginador';
import Volver from '../general/Volver';
import Filtro from '../search/Filtro';
import ProductoVistaMiniatura from '../venta/ProductoVistaMiniatura';
import GetMarcas from '../../helpers/GetMarcas';
import GetCategorias from '../../helpers/GetCategorias';
import Capitalize from '../../utils/capitalize';
import GetProductos from '../../helpers/GetProductos';
import { useRouter } from 'next/router';

const Search = ({ desabilitados, query }: any) => {
	const rangoPrecios = [0, 1000000];
	const [pagina, setPagina] = useState(1);
	const [maxPag, setMaxPag] = useState(0);
	const [productos, setProductos] = useState([]);
	const [marcas, setMarcas] = useState([]);
	const [categorias, setCategorias] = useState([]);
	const [loading, setLoading] = useState(true);
	const router = useRouter();

	const handdleFilter = (filtro: any) => {
		let newQuery = '';
		if (filtro.busqueda) {
			newQuery += `busqueda=${filtro.busqueda}&`;
		}
		if (filtro.categorias) {
			newQuery += `cat=${filtro.categorias.join(',')}&`;
		}
		if (filtro.marcas) {
			newQuery += `marca=${filtro.marcas.join(',')}&`;
		}
		if (filtro.precio_min) {
			newQuery += `pmin=${filtro.precio_min}&`;
		}
		if (filtro.precio_max) {
			newQuery += `pmax=${filtro.precio_max}&`;
		}
		router.push(`/search?${newQuery}`);
	};

	useEffect(() => {
		GetMarcas()
			.then((res) => {
				const marcas_ = res.map((m: any) => ({
					value: m.id,
					label: Capitalize(m.nombre),
				}));
				setMarcas(marcas_);
			})
			.catch((err) => {});
		GetCategorias()
			.then((res) => {
				const categorias_ = res.map((c: any) => ({
					value: c.id,
					label: Capitalize(c.nombre),
				}));
				setCategorias(categorias_);
			})
			.catch((err) => {});
	}, []);

	useEffect(() => {
		if (marcas.length == 0 || categorias.length == 0) return;
		let getProductosOptions = {
			page: pagina,
			limit: 12,
		};
		//Search categoria
		if (query.cat) {
			let categoriasFind = null;
			const categoriasQuery = query.cat.split(',');
			categoriasFind = categorias.reduce((newArray: any, item: any) => {
				if (categoriasQuery.includes(item.label.toLowerCase())) {
					newArray.push(item.value);
				}
				return newArray;
			}, []);
			getProductosOptions = {
				...getProductosOptions,
				//@ts-ignore
				categorias: categoriasFind,
			};
		}
		//search busqueda
		if (query.busqueda) {
			getProductosOptions = {
				...getProductosOptions,
				//@ts-ignore
				busqueda: query.busqueda,
			};
		}
		//search marca
		if (query.marca) {
			let marcasFind = null;
			const marcasQuery = query.marca.split(',');
			marcasFind = marcas.reduce((newArray: any, item: any) => {
				if (marcasQuery.includes(item.label.toLowerCase())) {
					newArray.push(item.value);
				}
				return newArray;
			}, []);
			getProductosOptions = {
				...getProductosOptions,
				//@ts-ignore
				marcas: marcasFind,
			};
		}
		//search precio
		if (query.pmin) {
			getProductosOptions = {
				...getProductosOptions,
				//@ts-ignore
				precio_min: query.pmin,
			};
		}
		if (query.pmax) {
			getProductosOptions = {
				...getProductosOptions,
				//@ts-ignore
				precio_max: query.pmax,
			};
		}

		//get data
		GetProductos(getProductosOptions, desabilitados)
			.then((res) => {
				if (!res.ok) {
					setLoading(false);
					return;
				}
				setProductos(res.productos.docs);
				setMaxPag(res.productos.totalPages);
				setLoading(false);
			})
			.catch(() => {
				setProductos([]);
				setLoading(false);
			});
	}, [pagina, categorias, marcas, query]);

	useEffect(() => {
		setPagina(1);
	}, [query]);

	return (
		<>
			<Volver />
			<br />
			<Filtro
				onFilter={(f) => {
					handdleFilter(f);
				}}
				marcas={marcas}
				categorias={categorias}
				precios={rangoPrecios}
				isLoading={loading}
			/>
			<br />
			<div className="search__mensajeEncontrados">
				<h2>Productos encontrados</h2>
				{loading && <p>Buscando...</p>}
				{productos && !loading && productos.length == 0 && (
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
							porcentaje_descuento={p.porcentaje_descuento}
							desabilitado={desabilitados}
						/>
					))}
			</div>
			<Paginador
				maxPage={maxPag}
				onChange={(p) => {
					setPagina(p);
				}}
			/>
		</>
	);
};

export default Search;
