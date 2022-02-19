import axios from 'axios';
import { APIURL } from '../utils/constantes';

const usePortadas = async () => {
	try {
		const data = await axios.get(APIURL + 'portadas');
		return data.data;
	} catch (error) {
		return {
			ok: false,
		};
	}
};

export default usePortadas;
