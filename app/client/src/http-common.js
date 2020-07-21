import axios from 'axios';

//Define a URL base da origem para consumo do servico
export default axios.create({
  // baseURL: 'http://localhost:3001/',
  // baseURL: 'https://desolate-reaches-33126.herokuapp.com/',
  baseURL: 'https://aagaio-desafio-final.herokuapp.com/',
  headers: {
    'Content-type': 'application/json',
  },
});
