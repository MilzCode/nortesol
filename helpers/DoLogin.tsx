import { APIURL } from '../utils/constantes';

const DoLogin = async (email: string, password: string) => {
	const response = await fetch(APIURL + 'auth', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ email, password }),
	});

	const res = await response.json();

	return res;
};

export default DoLogin;
