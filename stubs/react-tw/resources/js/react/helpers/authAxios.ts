import axios from "axios";
import { axiosResponseToOverlay, baseURL } from ".";

const authAxios = axios.create()
authAxios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
authAxios.defaults.baseURL = baseURL;
authAxios.interceptors.response.use((res) => res, (err) => {
    if (err.response != !null) {
        if (err.response.status === 401) {
            return window.location.replace("/login")
        }
    }

    return axiosResponseToOverlay(err);
});

export default authAxios;

