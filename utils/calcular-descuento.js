const CalcularPorcentajeDescuento = (precio, descuento, exact = false) => {
	if (exact) {
		return (descuento * 100) / precio;
	}
	let porcentaje = Math.round((descuento * 100) / precio);
	if (porcentaje == 0) {
		porcentaje = 1;
	}
	return porcentaje;
};
export default CalcularPorcentajeDescuento;
