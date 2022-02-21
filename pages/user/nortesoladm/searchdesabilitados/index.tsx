import Search from '../../../../components/search';

const modeDisabled = ({ me, auth }: any) => {
	if (!auth || !me.admin) {
		window.location.href = '/';
		return null;
	}
	return <Search desabilitados />;
};

export default modeDisabled;
