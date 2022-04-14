// import React from "react";
// import BotonFAColores1 from "../components/general/BotonFAColores1";
// import Link from "next/link";
import Wredirect from '../helpers/Wredirect';

// const RutaDefault = () => {
//   return (
//     <div className="rutaDefault">
//       <p className="rutaDefault__msg NOSELECT">
//         404 D: ! Esta no es una ruta valida amig@
//       </p>
//       <Link href="/" passHref>
//         <div>
//           <BotonFAColores1>ir a la pagina principal</BotonFAColores1>
//         </div>
//       </Link>
//     </div>
//   );
// };

/*
  De esta forma en caso de error mandara al login
*/
const RutaDefault = () => {
	// alert("404")
	Wredirect();
	return null;
};

export default RutaDefault;
