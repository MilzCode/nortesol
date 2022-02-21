import Search from '../../../../components/search';
import wredirect from '../../../../helpers/wredirect';

const modeDisabled = ({ me, auth }: any) => {
	if (!auth || !me.admin) {
		wredirect();
		return null;
	}
	return <Search desabilitados />;
};

export default modeDisabled;
