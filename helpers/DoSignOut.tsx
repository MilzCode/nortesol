import React from 'react';

const DoSignOut = async () => {
	localStorage.removeItem('tken');
};

export default DoSignOut;
