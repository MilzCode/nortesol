import React from 'react';

const useCantidadProductoCarrito = (id = '') => {
	const carrito = JSON.parse(localStorage.getItem('carrito') || '[]');
	const producto = carrito.find((pr: any) => pr.p === id);
	if (producto) {
		return producto.c;
	}
	return 0;
};

export default useCantidadProductoCarrito;
