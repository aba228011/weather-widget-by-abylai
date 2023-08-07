import baseAPI from "../API/baseAPI";
import type {IWeatherCity} from "@/types";

export const getWeatherActs: any = {
    getByCityName: async (name: string) => await baseAPI
        .get<IWeatherCity>(`?q=${name}&units=metric&APPID=${import.meta.env.VITE_APP_WEATHER_API_KEY}&mode=xml`)
        .then(({data}) => data),
    getByLatAndLon: async (lat: number, lon: number) => await baseAPI
        .get<IWeatherCity>(`?lat=${lat}&lon=${lon}&units=metric&APPID=${import.meta.env.VITE_APP_WEATHER_API_KEY}&mode=xml`)
        .then(({data}) => data),
};
