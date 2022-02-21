import axios from 'axios';
import { APIURL } from '../utils/constantes';
import wredirect from '../helpers/wredirect';

const useRemoverPortada = async (idPortada = '') => {
	try {
		const token = localStorage.getItem('tken');
		if (!token) {
			wredirect();
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
