import Search from '../components/search';
const search = ({ query }: any) => {
	return <Search query={query} />;
};

export default search;

export async function getServerSideProps({ query }: any) {
	try {
		return {
			props: {
				query,
			},
		};
	} catch (error) {
		return {
			props: {},
		};
	}
}
