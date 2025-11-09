import axios from "axios";
import useAuth from "./useAuth";

const instance = axios.create({
    baseURL: 'https://smart-deals-server-phi.vercel.app/',
})
const useSequreAxios = () => {
    const { user } = useAuth();
    
    instance.interceptors.request.use(config => {
         // Do something before request is sent
        config.headers.Authorization = `Bearer ${user?.accessToken}`
        return config;

    },

)
    return instance;
};

export default useSequreAxios;