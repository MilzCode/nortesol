// @ts-nocheck
// tslint:disable
import React, { useState } from 'react';
import Select from 'react-select';
import { formatPriceToNumber } from '../../utils/formatoPrecio';
import SliderPrecios from './SliderPrecios';

/**
 *
 */

interface dataInicial {
	marcas?: Array<{ value: string; label: string }>;
	categorias?: Array<{ value: string; label: string }>;
	productos?: Array<{ value: string; label: string }>;
	precio?: { min: number; max: number };
}
interface filtroProps {
	mode1?: boolean | undefined;
	data?: dataInicial;
	onFilter?: (e: FormDataEvent | any) => any;
}
const Filtro = ({
	mode1,
	data: dataInicial = {},
	onFilter = (...props: any) => {},
}: filtroProps) => {
	const [values, setValues] = useState({
		marcas: [],
		precios: [],
		categorias: [],
		productos: [],
	});

	dataInicial.marcas = dataInicial.marcas ?? [
		{ value: 'torre', label: 'Torre' },
		{ value: 'murano', label: 'Murano' },
		{ value: 'colon', label: 'Colon' },
	];
	dataInicial.categorias = dataInicial.categorias ?? [
		{ value: 'categoria1', label: 'Categoria 1' },
		{ value: 'categoria2', label: 'Categoria 2' },
		{ value: 'categoria3', label: 'Categoria 3' },
	];
	dataInicial.productos = dataInicial.productos ?? [
		{ value: 'producto1', label: 'Producto 1' },
		{ value: 'producto2', label: 'Producto 2' },
		{ value: 'producto3', label: 'Producto 3' },
	];
	dataInicial.precio = dataInicial.precio ?? { min: 0, max: 1000000 };

	const { marcas, categorias, productos } = dataInicial;

	const [togle, setTogle] = useState(true);
	const [precios, setPrecios] = useState([
		dataInicial.precio.min,
		dataInicial.precio.max,
	]);

	//precio es una variable que maneja string, aunque se inicializa como int para establecer el rango de precios
	let data = { values };
	const handdlePrecio = (precios: any) => {
		precios = precios.map((p: String) => {
			return formatPriceToNumber(p);
		});
		setPrecios(precios);
	};
	const handdleMarcas = (marcas: any) => {
		data = { ...values, marcas };
		setValues(data);
	};
	const handdleCategorias = (categorias: any) => {
		data = { ...values, categorias };
		setValues(data);
	};
	const handdleProductos = (productos: any) => {
		data = { ...values, productos };
		setValues(data);
	};

	const handdleFiltrar = (e: FormDataEvent | any) => {
		e.preventDefault();
		data = { ...values, precios };
		setValues(data);
		onFilter(data);
	};

	return (
		<form className={`filtro ${togle && 'filtro--noFilter'} NOSELECT`}>
			<div className="filtro__togle" onClick={() => setTogle(!togle)}>
				<span>Filtrar: </span>
				{togle && <i className="far fa-window-maximize"></i>}
				{!togle && <i className="fas fa-window-maximize"></i>}
			</div>
			<div className="filtro__marca">
				<span>Marca:</span>
				<Select
					inputId="filtro-marca"
					isMulti
					name="marcas"
					options={marcas}
					className="basic-multi-select"
					classNamePrefix="select"
					value={values.marcas}
					onChange={handdleMarcas}
					placeholder="Filtrar marca"
				/>
			</div>
			<div className="filtro__precio">
				<span className="filtro__labelPrecio">Precio:</span>
				<SliderPrecios
					minValue={dataInicial.precio.min}
					maxValue={dataInicial.precio.max}
					onChange={handdlePrecio}
					className="filtro__slider"
				/>
			</div>
			<div className="filtro__categoria">
				<span>Categoria:</span>
				<Select
					inputId="filtro-categoria"
					isMulti
					name="categoria"
					options={categorias}
					className="basic-multi-select"
					classNamePrefix="select"
					value={values.categorias}
					onChange={handdleCategorias}
					placeholder="Filtrar categoria"
				/>
			</div>
			<div className="filtro__producto">
				<span>Producto:</span>
				<Select
					inputId="filtro-producto"
					isMulti
					name="producto"
					options={productos}
					className="basic-multi-select"
					classNamePrefix="select"
					value={values.productos}
					onChange={handdleProductos}
					placeholder="Filtrar producto"
				/>
			</div>
			{mode1 && (
				<div className="filtro__filtro1">
					<span>Estado (no/si habilitado):</span>
					<Select
						inputId="filtro-filtro1"
						isMulti
						name="filtro"
						options={productos}
						className="basic-multi-select"
						classNamePrefix="select"
						// value={}
						// onChange={}
						placeholder="Filtrar estado"
					/>
				</div>
			)}
			<button className="filtro__filtrarBTN" onClick={handdleFiltrar}>
				Filtrar
			</button>
		</form>
	);
};

export default Filtro;
