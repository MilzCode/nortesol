import React from 'react';
import axios from 'axios';
import { APIURL } from '../utils/constantes';

const useDesabilitarProducto = async ({ id }: any) => {
	try {
		const token = localStorage.getItem('tken');
		if (!token) {
			return { ok: false };
		}
		if (!id) {
			return { ok: false, msg: 'Falta id' };
		}
		const response = await axios.delete(APIURL + 'productos/' + id, {
			headers: {
				'x-token': token,
			},
		});
		return response.data;
	} catch (error) {
		return { ok: false, msg: 'Hubo un problema contacta al administrador**.' };
	}
};

export default useDesabilitarProducto;
