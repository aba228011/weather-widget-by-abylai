import baseAPI from "../API/baseAPI";
import type {Forecast} from "@/types";

export const getWeatherActs: any = {
    getByCityName: async (name: string) => await baseAPI
        .get<Forecast>(`?q=${name}&units=metric&APPID=${import.meta.env.VITE_APP_WEATHER_API_KEY}&mode=xml`)
        .then(({data}) => data),
    getByLatAndLon: async (lat: number, lon: number) => await baseAPI
        .get<Forecast>(`?lat=${lat}&lon=${lon}&units=metric&APPID=${import.meta.env.VITE_APP_WEATHER_API_KEY}&mode=xml`)
        .then(({data}) => data),
};
