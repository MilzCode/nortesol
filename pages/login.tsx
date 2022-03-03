import React, { useState } from 'react';
import BotonFAColores1 from '../components/general/BotonFAColores1';
import { useRouter } from 'next/router';
import Volver from '../components/general/Volver';
import Firebase from '../firebase';
import DoLoginFirebase from '../helpers/DoLogin';

const initialState = {
	email: '',
	password: '',
};

const Ingresar = ({ auth }: any) => {
	const router = useRouter();
	if (auth) router.push('/');

	const handdleGoogleSignIn = () => {
		// window.open('http://localhost:8080/api/auth/google', '_self');
		Firebase.loginGoogle();
	};
	const handdleFacebookSignIn = () => {
		// window.open('http://localhost:8080/api/auth/facebook', '_self');
		Firebase.loginFacebook();
	};

	return (
		<>
			<Volver />

			<div className="login">
				<div className="login__irRegistro">
					<h3 className="login__titulo">Ingresar</h3>
					<BotonFAColores1
						backgroundColor="#d34836"
						onClick={handdleGoogleSignIn}
					>
						&nbsp;&nbsp;
						<i className="fab fa-google" />
						&nbsp;&nbsp;Ingreso con Google&nbsp;&nbsp;
					</BotonFAColores1>
					<br />
					<BotonFAColores1
						backgroundColor="#4267b2"
						onClick={handdleFacebookSignIn}
					>
						<i className="fab fa-facebook-f" />
						&nbsp;&nbsp;Ingreso con Facebook
					</BotonFAColores1>
				</div>
			</div>
		</>
	);
};

export default Ingresar;
