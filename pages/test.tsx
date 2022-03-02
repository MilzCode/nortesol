import React from 'react';
//import firebase storage

const TEST = ({ fb }: any) => {
	const handdleGoogleSignIn = () => {
		window.open('http://localhost:8080/api/auth/google', 'newwindow', 'width=800, height=600');
	};
	return (
		<div>
			{/* input file img */}
			<br />
			<button onClick={handdleGoogleSignIn}>GOGGLE SIGNIN</button>
			<br />
		</div>
	);
};

export default TEST;
