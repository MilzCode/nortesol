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
import GetFilterQuery from '../../helpers/GetFilterQueryToOptions';
import { paths } from '../../utils/constantes';

const Search = ({
	desabilitados,
	query = null,
	categoriasInit = [],
	marcasInit = [],
	productosHabResInit = null,
	resolvedUrl,
}: any) => {
	const rangoPrecios = [0, 1000000];
	const [productos, setProductos] = useState(productosHabResInit?.docs || []);
	const [maxPag, setMaxPag] = useState(productosHabResInit?.totalPages || 0);
	const [pagina, setPagina] = useState(productosHabResInit?.page || 1);
	const [marcas, setMarcas] = useState(marcasInit);
	const [filtroCampos, setFiltroCampos] = useState<any>(null);
	const [categorias, setCategorias] = useState(categoriasInit);
	const router = useRouter();
	const handdleFilter = (filtro: any) => {
		let newQuery = '';
		const url = desabilitados ? paths.searchDesabilitados : '/search';

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
		setFiltroCampos(filtro);
		router.push(url + `?${newQuery}`);
	};

	useEffect(() => {
		if (categoriasInit.length > 0 && marcasInit.length > 0) return;
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
		if (productosHabResInit && !desabilitados) {
			setProductos(productosHabResInit.docs);
			setMaxPag(productosHabResInit.totalPages);
			setPagina(productosHabResInit.page);
			return;
		}

		if (categoriasInit.length > 0 && marcasInit.length > 0) return;

		let newQueryParamsFront: any = {};
		if (filtroCampos?.marcas) {
			newQueryParamsFront.marca = filtroCampos.marcas.join(',');
		}
		if (filtroCampos?.categorias) {
			newQueryParamsFront.cat = filtroCampos.categorias.join(',');
		}
		//LINEA PARA EVITAR peticiones innecesarias
		if (marcas.length == 0 || categorias.length == 0) return;
		newQueryParamsFront.page = pagina;
		GetProductos(
			{
				...filtroCampos,
				queryParamsFront: newQueryParamsFront,
				page: pagina,
			},
			desabilitados
		)
			.then((res) => {
				if (!res.ok) {
					return;
				}
				setProductos(res.productos.docs);
				setMaxPag(res.productos.totalPages);
			})
			.catch(() => {
				setProductos([]);
			});

		//TODO: tiene sentido que este pagina?
	}, [pagina, categorias, marcas, productosHabResInit, filtroCampos, query]);

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
			/>
			<br />
			<div className="search__mensajeEncontrados">
				<h2>Productos encontrados&nbsp;</h2>
				{productos && productos.length == 0 && <p>Sin resultados... </p>}
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
				page={query?.page}
				onChange={(p) => {
					if (resolvedUrl) {
						//replace page=ANY
						if (resolvedUrl.includes('page=')) {
							resolvedUrl = resolvedUrl.replace(/page=\d+/, ``);
						}
						resolvedUrl += `&page=${p}`;
						router.push(resolvedUrl);
					} else {
						const url = desabilitados ? paths.searchDesabilitados : '/search';
						router.push(url + '?page=' + p);
					}
					!productosHabResInit && setPagina(p);
				}}
			/>
		</>
	);
};

export default Search;
