import React, { useState, useEffect } from 'react';
import Paginador from '../components/general/Paginador';
import Volver from '../components/general/Volver';
import Filtro from '../components/search/Filtro';
import ProductoVistaMiniatura from '../components/venta/ProductoVistaMiniatura';
import useMarcas from '../hooks/useMarcas';
import useCategorias from '../hooks/useCategorias';
import Capitalize from '../utils/capitalize';
const Search = () => {
	const rangoPrecios = [0, 1000000];
	const [pagina, setPagina] = useState(1);
	const [filtroCampos, setFiltroCampos] = useState(null);
	const [productos, setProductos] = useState([]);
	const [marcas, setMarcas] = useState([]);
	const [categorias, setCategorias] = useState([]);

	useEffect(() => {
		useMarcas()
			.then((res) => {
				const marcas_ = res.map((m: any) => {
					return { value: m, label: Capitalize(m) };
				});
				setMarcas(marcas_);
			})
			.catch((err) => {});
		useCategorias()
			.then((res) => {
				const categorias_ = res.map((c: any) => {
					return { value: c, label: Capitalize(c) };
				});
				setCategorias(categorias_);
			})
			.catch((err) => {});
	}, []);
	useEffect(() => {
		if (filtroCampos) {
			console.log(filtroCampos);
		}
	}, [filtroCampos]);

	return (
		<>
			<Volver />
			<br />
			<Filtro
				onFilter={(f) => {
					setFiltroCampos(f);
				}}
				marcas={marcas}
				categorias={categorias}
				precios={rangoPrecios}
			/>
			<br />
			<div className="search__mensajeEncontrados">
				<h2>Productos de</h2>
				<p>Ejemplo de categoría o busqueda</p>
			</div>
			<div className="index__productos">
				<ProductoVistaMiniatura />
				<ProductoVistaMiniatura />
				<ProductoVistaMiniatura />
				<ProductoVistaMiniatura />
				<ProductoVistaMiniatura />
				<ProductoVistaMiniatura />
				<ProductoVistaMiniatura />
				<ProductoVistaMiniatura />
				<ProductoVistaMiniatura />
			</div>
			<Paginador maxPagina={50} setPagina={setPagina} pagina={pagina} />
		</>
	);
};

export default Search;
