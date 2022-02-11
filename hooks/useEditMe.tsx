import React from 'react';
import { APIURL } from '../utils/constantes';

//TODO: Este componente puede recibir parametros opcionales
const useEditMe = async (
	password_original: string,
	nombre?: string,
	rut?: string,
	celular?: number,
	region?: string,
	ciudad?: string,
	direccion?: string,
	password?: string
) => {
	if (!password_original) {
		return { errors: 'No existe password original' };
	}
	const data = {
		nombre,
		rut,
		celular,
		region,
		ciudad,
		direccion,
		password,
		password_original,
	};
	const miId = localStorage.getItem('me');
	const token = localStorage.getItem('tken');
	if (!token || !miId) {
		return { errors: 'No existe token' };
	}
	console.log('intentando update...');

	try {
		const response = await fetch(APIURL + 'usuarios/' + miId, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				'x-token': token,
			},
			body: JSON.stringify(data),
		});
		const res = await response.json();
		return res;
	} catch (error) {
		return { errors: 'Error conexion con base de datos' };
	}
};

export default useEditMe;
