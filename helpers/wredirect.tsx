/**
 * Wredirect es un metodo de redireccion que asegura que el objeto window exista.
 */
const Wredirect = (url = '/') => {
	if (typeof window !== 'undefined') {
		window.location.replace(url);
	}
	return null;
};

export default Wredirect;
