const CalcularPorcentajeDescuento = (precio, descuento) => {
	const porcentaje = (descuento * 100) / precio;
	return Math.round(porcentaje);
};
export default CalcularPorcentajeDescuento;
