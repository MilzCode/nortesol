const useCantidadTotalCarrito = () => {
	const carrito = JSON.parse(localStorage.getItem('carrito') || '[]');
	let cantidad = 0;
	carrito.forEach((producto: any) => {
		cantidad += producto.c;
	});
	return cantidad;
};

export default useCantidadTotalCarrito;
