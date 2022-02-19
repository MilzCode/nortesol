//TODO: LOS ARREGLOS O MARCAS NO DEBEN TENER COMAS ";;" ya que se utilizan para separar los valores.
import React from 'react';
import { useState, useEffect } from 'react';
import useMarcas from '../../../hooks/useMarcas';
import BotonFAColores1 from '../../../components/general/BotonFAColores1';
import useCrearMarca from '../../../hooks/useCrearMarca';
import VentanaModal from '../../../components/general/VentanaModal';
import Volver from '../../../components/general/Volver';

const addmarca = () => {
	const [marcas, setMarcas] = useState([]);
	const [marcaTitulo, setMarcaTitulo] = useState('');
	const [marcaMsg, setMarcaMsg] = useState('');
	const [marcaModal, setMarcaModal] = useState(false);

	useEffect(() => {
		!marcaModal &&
			useMarcas()
				.then((m) => {
					setMarcas(m);
				})
				.catch();
	}, [marcaModal]);

	const handdleMarca = async (e: FormDataEvent | any) => {
		e.preventDefault();
		const marca = e.target.marca.value;
		marca &&
			useCrearMarca({ nombre: marca })
				.then((m) => {
					if (m.ok) {
						setMarcaTitulo('Marca Creada');
						setMarcaMsg('Marca creada con exito');
					} else {
						setMarcaTitulo('Error');
						setMarcaMsg(m.msg);
					}
				})
				.catch((e) => {
					console.log('ERROR1');
					setMarcaTitulo('Error');
					setMarcaMsg('Contacte con el administrador');
				});
		marca && setMarcaModal(true);
	};

	return (
		<>
			<Volver />
			<div className="LABELINPUT">
				<label>Marcas ingresadas</label>
				<select multiple>
					{marcas.map((m: String | any, i) => (
						<option
							// selected={'Otras' === m}
							key={i}
						>
							{m}
						</option>
					))}
				</select>
			</div>
			<hr />
			<form onSubmit={handdleMarca}>
				<div className="LABELINPUT">
					<label htmlFor="marca">Nueva marca</label>
					<input id="marca" type="text" />
				</div>
				<BotonFAColores1 backgroundColor="#ff6a39">
					Ingresar Marca
				</BotonFAColores1>
			</form>

			{marcaModal && (
				<VentanaModal
					titulo={marcaTitulo}
					onClose={() => {
						setMarcaModal(false);
					}}
				>
					{marcaMsg}
				</VentanaModal>
			)}
		</>
	);
};

export default addmarca;
