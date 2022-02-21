import React from 'react';

const Footer = ({ appMode }: any) => {
	return (
		<footer
			className="footer"
			style={{ backgroundColor: appMode == 1 ? '#f9423a' : '' }}
		>
			<div className="footer__contenido">
				<img
					className="footer__logo NOSELECT"
					src="/static/img/logoNortesol.png"
					alt="logo"
				/>
				<span className="footer__datos">
					Correo: asdasd@dominio.cl
					<br />
					Direccion: Avenida Siempre Viva 123
				</span>
			</div>
			<div className="footer__followRRSS"></div>
			<div className="footer__creditos">Creado ♥ por MILZ Soluciones</div>
		</footer>
	);
};

export default Footer;
