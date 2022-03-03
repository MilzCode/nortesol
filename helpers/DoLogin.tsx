import { APIURL } from '../utils/constantes';

const DoLoginFirebase = async ({ fb_token }: any) => {
	if (!fb_token) {
		return false;
	}
	const token = localStorage.getItem('tken');
	if (token) {
		return false;
	}
	const response = await fetch(APIURL + 'auth/firebase', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			['fb-token']: `${fb_token}`,
		},
	});

	const res = await response.json();
	localStorage.setItem('tken', res.token);

	return res;
};

export default DoLoginFirebase;
