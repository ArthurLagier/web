import axios from "axios";

const BASE_URL= "lien API"
const API_KEY= "clé api"
const apiKey = process.env.REACT_APP_API_KEY;

export const api= axios.create({
baseURL: 'https://jsonfakery.com'
});

//baseURL: 'https://api.escuelajs.co/api/v1'
