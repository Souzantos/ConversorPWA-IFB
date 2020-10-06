import axios from 'axios';

const api = axios.create({
    baseURL: 'http://economia.awesomeapi.com.br/json/all/${this.state.moedas}'
});

export default api;