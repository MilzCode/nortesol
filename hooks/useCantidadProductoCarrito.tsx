import React from 'react';

const useCantidadProductoCarrito = (id = '') => {
	try {
		const carrito = JSON.parse(localStorage.getItem('carrito') || '[]');
		const producto = carrito.find((pr: any) => pr.p === id);
		if (producto) {
			return producto.c;
		}
		return 0;
	} catch (error) {
		localStorage.removeItem('carrito');
		window.location.replace('/');
	}
};

export default useCantidadProductoCarrito;
