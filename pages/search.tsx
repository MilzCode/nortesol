import Search from '../components/search';
import Capitalize from '../utils/capitalize';
import { APIURL } from '../utils/constantes';
import Head from 'next/head';

const search = ({
	query,
	categoriasInit,
	marcasInit,
	productosHabResInit,
	resolvedUrl,
}: any) => {
	query = query;

	return (
		<>
			<Head>
				<title>{`Busqueda de producto libreria nortesol ${query?.busqueda}`}</title>
			</Head>
			<Search
				query={query}
				categoriasInit={categoriasInit}
				marcasInit={marcasInit}
				productosHabResInit={productosHabResInit}
				resolvedUrl={resolvedUrl}
			/>
		</>
	);
};

export default search;

export async function getServerSideProps({ query, resolvedUrl }: any) {
	console.log("llamado!")
	try {
		const fetchOptions = {
			method: 'GET',
			headers: {
				origin_sv: process.env.ORIGIN_SV_KEY || '',
			},
		};
		const categoriasReq = fetch(APIURL + 'categorias', fetchOptions);
		const marcasReq = fetch(APIURL + 'marcas', fetchOptions);
		const productosHabReq = fetch(
			APIURL + 'productos?queryParamsFront=' + JSON.stringify(query),
			fetchOptions
		);
		const respuestasCyM = await Promise.all([
			categoriasReq,
			marcasReq,
			productosHabReq,
		]);
		const [categoriasRes, marcasRes, productosHabRes] = await Promise.all(
			respuestasCyM.map((r) => r.json())
		);

		const categoriasInit = categoriasRes.categorias.map((m: any) => ({
			value: m.id,
			label: Capitalize(m.nombre),
		}));
		const marcasInit = marcasRes.marcas.map((c: any) => ({
			value: c.id,
			label: Capitalize(c.nombre),
		}));

		return {
			props: {
				query,
				categoriasInit,
				marcasInit,
				productosHabResInit: productosHabRes.productos,
				resolvedUrl,
			},
		};
	} catch (error) {
		return {
			props: {},
		};
	}
}
