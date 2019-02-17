import axios from "axios";

import { URL } from '../config/constants';

const api = axios.create({
   baseURL: URL,
   responseType: 'json',
});

export default api;
