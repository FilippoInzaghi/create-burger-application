import axios from 'axios';

const instance = axios.create({
 baseURL: 'https://create-burger-application.firebaseio.com/'
});

export default instance;