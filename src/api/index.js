import axios from 'axios';
import store from '../store'
import { logout } from '../store/actions'
import { validateToken } from '../store/util';
import endpoints from './endpoints';

const FRIES_API = "/fries/api/v1/analytics";

const instance = axios.create({
    baseURL: window._env_.REACT_APP_API_URL
})


instance.interceptors.request.use(config => {

    // Don't intercept login request
    if (config.url === endpoints.sign_in)
        return config;

    // Add auth token to each request if exists/valid
    const checkValidToken = validateToken();
    if (checkValidToken.isValid) {
        const token = checkValidToken.authData.token;
        config.baseURL += FRIES_API;
        config.headers['x-test-user-id'] = '5d9cb1b2bba685001aac5e72';
        return config;
    }
    else {
        // Else logout and don't continue the request
        store.dispatch(logout())
        return;
    }
});
export default instance;