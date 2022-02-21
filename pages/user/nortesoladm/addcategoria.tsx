//TODO: LOS ARREGLOS O CATEGORIAS NO DEBEN TENER COMAS ";;" ya que se utilizan para separar los valores.

import React from 'react';
import { useState, useEffect } from 'react';
import BotonFAColores1 from '../../../components/general/BotonFAColores1';
import VentanaModal from '../../../components/general/VentanaModal';
import Volver from '../../../components/general/Volver';
import useCategorias from '../../../hooks/useCategorias';
import useCrearCategoria from '../../../hooks/useCrearCategoria';

const addcategoria = ({ me, auth }: any) => {
	if (!auth || !me.admin) {
		window.location.href = '/';
		return null;
	}
	const [categorias, setCategorias] = useState([]);
	const [categoriaTitulo, setCategoriaTitulo] = useState('');
	const [categoriaMsg, setCategoriaMsg] = useState('');
	const [categoriaModal, setCategproaModal] = useState(false);

	useEffect(() => {
		!categoriaModal &&
			useCategorias()
				.then((c) => {
					setCategorias(c);
				})
				.catch();
	}, [categoriaModal]);

	const handdleCategoria = async (e: FormDataEvent | any) => {
		e.preventDefault();
		const categoria = e.target.categoria.value;
		categoria &&
			useCrearCategoria({ nombre: categoria })
				.then((c) => {
					if (c.ok) {
						setCategoriaTitulo('Categoria Creada');
						setCategoriaMsg('Categoria creada con exito');
					} else {
						setCategoriaTitulo('Error');
						setCategoriaMsg(c.msg);
					}
				})
				.catch((e) => {
					console.log('ERROR1');
					setCategoriaTitulo('Error');
					setCategoriaMsg('Contacte con el administrador');
				});
		categoria && setCategproaModal(true);
	};

	return (
		<>
			<Volver />
			<h1 className="producto__titulo">Crear Categoria</h1>
			<br />
			<div className="LABELINPUT">
				<label>Categorias ingresadas</label>
				<select multiple>
					{categorias.map((c: String | any, i) => (
						<option
							// selected={'Otras' === m}
							key={i}
						>
							{c}
						</option>
					))}
				</select>
			</div>
			<hr />
			<form onSubmit={handdleCategoria}>
				<div className="LABELINPUT">
					<label htmlFor="categoria">Nueva categoria</label>
					<input id="categoria" type="text" />
				</div>
				<BotonFAColores1 backgroundColor="#ff6a39">
					Ingresar Categoria
				</BotonFAColores1>
			</form>

			{categoriaModal && (
				<VentanaModal
					titulo={categoriaTitulo}
					onClose={() => {
						setCategproaModal(false);
					}}
				>
					{categoriaMsg}
				</VentanaModal>
			)}
		</>
	);
};

export default addcategoria;
