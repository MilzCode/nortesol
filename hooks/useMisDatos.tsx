import { APIURL } from '../utils/constantes';
import JWT from 'jsonwebtoken';

const useMisDatos = async (miId: string) => {
	const token = localStorage.getItem('tken');

	if (!token || !miId) {
		return null;
	}

	const response = await fetch(APIURL + 'usuarios/' + miId, {
		method: 'GET',
		headers: {
			['x-token']: `${token}`,
			'Content-Type': 'application/json',
		},
	});
	const { admin, ...data } = await response.json();
	if (data.ok) {
		return { ...data.usuario, admin };
	}
	return null;
};

export default useMisDatos;
