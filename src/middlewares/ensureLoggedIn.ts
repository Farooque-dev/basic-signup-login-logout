import {ensureLoggedIn} from 'connect-ensure-login';

export const ensureAuthenticated = ensureLoggedIn('/login');
