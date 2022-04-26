import Search from '../components/search';
import Capitalize from '../utils/capitalize';
import { APIURL } from '../utils/constantes';
import { useRouter } from 'next/router';

const search = ({ query, categoriasInit, marcasInit }: any) => {
	const router = useRouter();
	query = query || router.query;

	return (
		<Search
			query={query}
			categoriasInit={categoriasInit}
			marcasInit={marcasInit}
		/>
	);
};

export default search;

export async function getServerSideProps({ query }: any) {
	try {
		const fetchOptions = {
			method: 'GET',
			headers: {
				origin_sv: process.env.ORIGIN_SV_KEY || '',
			},
		};
		const categoriasReq = fetch(APIURL + 'categorias', fetchOptions);
		const marcasReq = fetch(APIURL + 'marcas', fetchOptions);
		const respuestasCyM = await Promise.all([categoriasReq, marcasReq]);
		const [categoriasRes, marcasRes] = await Promise.all(
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

		// const productosReq = await fetch(APIURL + 'productos', fetchOptions);
		// let productosRes = null;
		// if (productosReq.status === 200) {
		// 	productosRes = await productosReq.json();
		// }
		// console.log({ productosRes });

		return {
			props: {
				query,
				categoriasInit,
				marcasInit,
			},
		};
	} catch (error) {
		return {
			props: {},
		};
	}
}
