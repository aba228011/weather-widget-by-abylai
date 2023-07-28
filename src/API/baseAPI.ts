import axios from "axios";

const baseAPI = axios.create({
    baseURL: import.meta.env.VITE_APP_WEATHER_API,
});

export default baseAPI;