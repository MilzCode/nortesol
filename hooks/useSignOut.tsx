import React from 'react';

const useSignOut = async () => {
	localStorage.removeItem('tken');
};

export default useSignOut;
