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
	const data = await response.json();
	if (data.ok) {
		console.log(data);
		return data.usuario;
	}
	return null;
};

export default useMisDatos;
