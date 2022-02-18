const formatNumberToprice = (price) => {
	price = Math.round(price);
	return `$${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;
};

const formatPriceToNumber = (price) => {
	return Number(
		price.replace('$', '').replace(',', '').replace('.', '').replace('+', '')
	);
};

export default formatNumberToprice;
export { formatPriceToNumber };
