import axios from 'axios';
export default axios.create({
    baseURL: `${process.env.VUE_APP_API_BASEURL}`,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
    }
});