import axios from 'axios';
import { APIURL } from '../utils/constantes';

const useRemoverPortada = async (idPortada = '') => {
	try {
		const token = localStorage.getItem('tken');
		if (!token) {
			window.location.replace('/');
			return;
		}
		const res = await axios.delete(APIURL + 'portadas/' + idPortada, {
			headers: {
				'x-token': token,
			},
		});
		return res.data;
	} catch (error) {
		return { ok: false };
	}
};

export default useRemoverPortada;
