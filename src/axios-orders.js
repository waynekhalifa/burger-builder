import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-builder-cc64c.firebaseio.com/'
});

export default instance;