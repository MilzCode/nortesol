import React from 'react';

const useProductosCarrito = () => {
	const carrito = JSON.parse(localStorage.getItem('carrito') || '[]');
};

export default useProductosCarrito;
