// @ts-nocheck
// tslint:disable
import React, { useState } from 'react';
import Select from 'react-select';
import { formatPriceToNumber } from '../../utils/formatoPrecio';
import SliderPrecios from './SliderPrecios';

interface filtroProps {
	marcas?: Array<{ value: string; label: string }>;
	categorias?: Array<{ value: string; label: string }>;
	precios?: [number, number];
	onFilter?: (e: FormDataEvent | any) => any;
	mode1?: boolean | undefined;
}

/**
 *
 * Ejemplo: marcas: [{ value: 'torre', label: 'Torre' }]
 *
 *
 * Ejemplo: categorias: [{ value: 'categoria1', label: 'Categoria 1' },...]
 *
 *
 * Ejemplo precios: [0,999999]
 *
 * @param marcas
 * @param categorias
 * @param precios
 *
 */
const Filtro = ({
	marcas,
	categorias,
	precios,
	onFilter = () => {},
	mode1,
}: filtroProps) => {
	marcas = marcas ?? [];
	categorias = categorias ?? [];
	//precios es una variable que maneja string, aunque se inicializa como int para establecer el rango de precios
	precios = precios ?? [0, 1000000];

	const [togle, setTogle] = useState(true);
	const [filtroData, setFiltroData] = useState<any>({});
	const [filtroPrecios, setFiltroPrecios] = useState([precios]);
	const handdleMarcas = (marcas: any) => {
		let filtroDataCopy = { ...filtroData };
		filtroDataCopy['marcas'] = marcas;
		setFiltroData({ ...filtroData, ...filtroDataCopy });
	};
	const handdleCategorias = (categorias: any) => {
		let filtroDataCopy = { ...filtroData };
		filtroDataCopy['categorias'] = categorias;
		setFiltroData({ ...filtroData, ...filtroDataCopy });
	};

	const handdlePrecios = (precios: any) => {
		setFiltroPrecios(precios);
	};

	const handdleFiltrar = (e: FormDataEvent | any) => {
		e.preventDefault();
		onFilter({ ...filtroData, precios: filtroPrecios });
	};

	return (
		<form className={`filtro ${togle && 'filtro--noFilter'} NOSELECT`}>
			<div className="filtro__togle" onClick={() => setTogle(!togle)}>
				<span>Filtrar: </span>
				{togle && <i className="far fa-window-maximize"></i>}
				{!togle && <i className="fas fa-window-maximize"></i>}
			</div>
			<div className="filtro__filtroA">
				<span>Marca:</span>
				<Select
					inputId="filtro-marca"
					isMulti
					name="marcas"
					options={marcas}
					className="basic-multi-select"
					classNamePrefix="select"
					value={filtroData.marcas}
					onChange={handdleMarcas}
					placeholder="Filtrar marca"
				/>
			</div>
			<div className="filtro__filtroB">
				<span className="filtro__labelPrecio">Precio:</span>
				<SliderPrecios
					minValue={precios[0]}
					maxValue={precios[1]}
					onChange={(p) => {
						handdlePrecios([
							formatPriceToNumber(p[0]),
							formatPriceToNumber(p[1]),
						]);
					}}
					className="filtro__slider"
				/>
			</div>

			<div className="filtro__filtroA">
				<span>Categoria:</span>
				<Select
					inputId="filtro-categoria"
					isMulti
					name="categoria"
					options={categorias}
					className="basic-multi-select"
					classNamePrefix="select"
					value={filtroData.categorias}
					onChange={handdleCategorias}
					placeholder="Filtrar categoria"
				/>
			</div>

			<button className="filtro__filtrarBTN" onClick={handdleFiltrar}>
				Filtrar
			</button>
		</form>
	);
};

export default Filtro;
