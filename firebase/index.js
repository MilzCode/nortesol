import firebaseConfig from './config';
import { initializeApp, getApps } from 'firebase/app';
import {
	getAuth,
	signInWithPopup,
	GoogleAuthProvider,
	FacebookAuthProvider,
} from 'firebase/auth';

class Firebase {
	constructor() {
		if (!getApps().length) {
			this.app = initializeApp(firebaseConfig);
		}
		this.auth = getAuth(this.app);
	}
	/*******METODOS*******/
	//Login
	async loginGoogle() {
		const provider = new GoogleAuthProvider();
		const token = await signInWithPopup(this.auth, provider)
			.then((result) => {
				const credential = GoogleAuthProvider.credentialFromResult(result);
				return credential?.accessToken;
			})
			.catch((error) => {
				const credential = GoogleAuthProvider.credentialFromError(error);
				return credential?.accessToken;

				// ...
			});
		if (token) localStorage.setItem('fb-tk', token);
	}
	async loginFacebook() {
		const provider = new FacebookAuthProvider();
		const token = await signInWithPopup(this.auth, provider)
			.then((result) => {
				const credential = FacebookAuthProvider.credentialFromResult(result);
				return credential?.accessToken;
			})
			.catch((error) => {
				const credential = FacebookAuthProvider.credentialFromError(error);
				return credential?.accessToken;
			});
		if (token) localStorage.setItem('fb-tk', token);
	}
}

const firebase = new Firebase();
export default firebase;
