import React, { useState } from 'react';
import BotonFAColores1 from '../components/general/BotonFAColores1';
import Link from 'next/link';
import useValidacion from '../hooks/useValidation';
import validarLogin from '../validations/validarLogin';
import { useRouter } from 'next/router';
import DoLogin from '../helpers/DoLogin';
import JWT from 'jsonwebtoken';
import Volver from '../components/general/Volver';
import Wredirect from '../helpers/Wredirect';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

const initialState = {
	email: '',
	password: '',
};

const Ingresar = ({ auth }: any) => {
	const router = useRouter();
	if (auth) router.push('/');
	const {
		valores,
		errores,
		handleSubmit,
		handleChange,
		handleBlur,
	} = useValidacion(initialState, validarLogin, ingresar);
	const [ingresoInvalido, setIngresoInvalido] = useState(false);
	async function ingresar() {
		try {
			const res = await DoLogin(valores.email, valores.password);
			if (!res.token) {
				throw new Error('No se pudo autenticar');
			}
			const decToken: any = JWT.decode(res.token);
			const miID = decToken.check;
			localStorage.setItem('tken', res.token);
			Wredirect();
		} catch (error) {
			setIngresoInvalido(true);
		}
	}

	const handdleGoogleSignIn = () => {
		// window.open('http://localhost:8080/api/auth/google', '_self');
		const auth = getAuth();
		signInWithPopup(auth, provider)
			.then((result) => {
				// This gives you a Google Access Token. You can use it to access the Google API.
				const credential = GoogleAuthProvider.credentialFromResult(result);
				const token = credential?.accessToken;
				// The signed-in user info.
				const user = result.user;
				// ...
			})
			.catch((error) => {
				// Handle Errors here.
				const errorCode = error.code;
				const errorMessage = error.message;
				// The email of the user's account used.
				const email = error.email;
				// The AuthCredential type that was used.
				const credential = GoogleAuthProvider.credentialFromError(error);
				// ...
			});
	};
	const handdleFacebookSignIn = () => {
		window.open('http://localhost:8080/api/auth/facebook', '_self');
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
				<br />
				<form className="login__form" onSubmit={handleSubmit}>
					<h3 className="login__titulo">Ingresar</h3>
					<div className="login__correo">
						<label htmlFor="correo" className="fas fa-user"></label>
						<input
							type="text"
							id="email"
							name="email"
							placeholder="Correo"
							onChange={(e) => {
								handleChange(e, true);
								setIngresoInvalido(false);
							}}
							onBlur={handleBlur}
						/>
						{errores.email && <i className="far fa-hand-pointer" />}
					</div>
					<div className="login__contrasena">
						<label htmlFor="contrasena" className="fas fa-key"></label>
						<input
							type="password"
							id="password"
							name="password"
							placeholder="Contraseña"
							onChange={(e) => {
								handleChange(e, true);
								setIngresoInvalido(false);
							}}
							onBlur={handleBlur}
						></input>
						{errores.password && <i className="far fa-hand-pointer" />}
					</div>
					<div className="ERRFORM">
						<ul className="register__errores">
							{errores.email && (
								<li>
									<i className="fas fa-exclamation-circle" />
									{errores.email}
								</li>
							)}
							{errores.password && (
								<li>
									<i className="fas fa-exclamation-circle" />
									{errores.password}
								</li>
							)}
							{ingresoInvalido && (
								<li>
									<i className="fas fa-exclamation-circle" />
									Usuario o contraseña incorrectos
								</li>
							)}
						</ul>
					</div>

					<BotonFAColores1>Ingresar</BotonFAColores1>
					<span className="login__mensajeOlvido">¿Olvidó su contraseña?</span>
				</form>
			</div>

			{/* <div className="login">
				<form className="login__form" onSubmit={handleSubmit}>
					<h3 className="login__titulo">Ingresar</h3>
					<div className="login__correo">
						<label htmlFor="correo" className="fas fa-user"></label>
						<input
							type="text"
							id="email"
							name="email"
							placeholder="Correo"
							onChange={(e) => {
								handleChange(e, true);
								setIngresoInvalido(false);
							}}
							onBlur={handleBlur}
						/>
						{errores.email && <i className="far fa-hand-pointer" />}
					</div>
					<div className="login__contrasena">
						<label htmlFor="contrasena" className="fas fa-key"></label>
						<input
							type="password"
							id="password"
							name="password"
							placeholder="Contraseña"
							onChange={(e) => {
								handleChange(e, true);
								setIngresoInvalido(false);
							}}
							onBlur={handleBlur}
						></input>
						{errores.password && <i className="far fa-hand-pointer" />}
					</div>
					<div className="ERRFORM">
						<ul className="register__errores">
							{errores.email && (
								<li>
									<i className="fas fa-exclamation-circle" />
									{errores.email}
								</li>
							)}
							{errores.password && (
								<li>
									<i className="fas fa-exclamation-circle" />
									{errores.password}
								</li>
							)}
							{ingresoInvalido && (
								<li>
									<i className="fas fa-exclamation-circle" />
									Usuario o contraseña incorrectos
								</li>
							)}
						</ul>
					</div>

					<BotonFAColores1>Ingresar</BotonFAColores1>
					<span className="login__mensajeOlvido">¿Olvidó su contraseña?</span>
				</form>
				<div className="login__irRegistro">
					<h3 className="login__titulo">Registrarse</h3>
					<Link passHref href="/register">
						<div>
							<BotonFAColores1>Crear Cuenta</BotonFAColores1>
						</div>
					</Link>
				</div>
			</div> */}
		</>
	);
};

export default Ingresar;
