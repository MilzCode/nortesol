import React, { useState } from 'react';
import Paginador from '../components/general/Paginador';
import Volver from '../components/general/Volver';
import Filtro from '../components/search/Filtro';
import ProductoVistaMiniatura from '../components/venta/ProductoVistaMiniatura';
const Search = () => {
	const [pagina, setPagina] = useState(1);
	const [filtroValues, setFiltroValues] = useState({
		marcas: [],
		precios: [],
		categorias: [],
		productos: [],
	});
	return (
		<>
			<Volver />
			<br />
			<Filtro values={filtroValues} setValues={setFiltroValues} />
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
