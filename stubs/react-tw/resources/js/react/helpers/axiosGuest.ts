import axios from "axios";
import { axiosResponseToOverlay, baseURL } from ".";

const guestAxios = axios.create()
guestAxios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
guestAxios.defaults.baseURL = baseURL;
guestAxios.interceptors.response.use(
    (res) => res,
    (err) => axiosResponseToOverlay(err)
);

export default guestAxios;

