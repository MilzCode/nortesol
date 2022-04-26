interface props {
	query: any;
	page: number;
	categorias: any;
	marcas: any;
}

const GetFilterQuery = ({ query, page, categorias, marcas }: props) => {
	let getProductosOptions = {
		page,
		limit: 12,
	};
	//Search categoria
	if (query.cat) {
		let categoriasFind = null;
		const categoriasQuery = query.cat.split(',');
		categoriasFind = categorias.reduce((newArray: any, item: any) => {
			if (categoriasQuery.includes(item.label.toLowerCase())) {
				newArray.push(item.value);
			}
			return newArray;
		}, []);
		getProductosOptions = {
			...getProductosOptions,
			//@ts-ignore
			categorias: categoriasFind,
		};
	}
	//search busqueda
	if (query.busqueda) {
		getProductosOptions = {
			...getProductosOptions,
			//@ts-ignore
			busqueda: query.busqueda,
		};
	}
	//search marca
	if (query.marca) {
		let marcasFind = null;
		const marcasQuery = query.marca.split(',');
		marcasFind = marcas.reduce((newArray: any, item: any) => {
			if (marcasQuery.includes(item.label.toLowerCase())) {
				newArray.push(item.value);
			}
			return newArray;
		}, []);
		getProductosOptions = {
			...getProductosOptions,
			//@ts-ignore
			marcas: marcasFind,
		};
	}
	//search precio
	if (query.pmin) {
		getProductosOptions = {
			...getProductosOptions,
			//@ts-ignore
			precio_min: query.pmin,
		};
	}
	if (query.pmax) {
		getProductosOptions = {
			...getProductosOptions,
			//@ts-ignore
			precio_max: query.pmax,
		};
	}

	return getProductosOptions;
};

export default GetFilterQuery;
