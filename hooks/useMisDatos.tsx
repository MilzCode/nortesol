import { APIURL } from '../utils/constantes';
import JWT from 'jsonwebtoken';

const useMisDatos = async () => {
	const token = localStorage.getItem('tken');
	const me = localStorage.getItem('me');
	if (!token || !me) {
		return null;
	}

	const response = await fetch(APIURL + 'usuarios/' + me, {
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
