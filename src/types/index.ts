interface ISys {
    country: string;
    id: number;
    sunrise: number;
    sunset: number;
    type: number;
};

interface IMain {
    feels_like: number;
    humidity: number;
    pressure: number;
    temp: number;
    temp_max: number;
    temp_min: number;
};

interface IWeather {
    description: string;
    icon: string;
    id: number;
    main: string;
}

interface IWeatherCity {
    coord: object;
    weather: Array<IWeather>;
    base: string;
    main: IMain;
    visibility: number;
    wind: object;
    clouds: object;
    rain: object;
    snow: object;
    dt: number;
    sys: ISys;
    timezone: number;
    id: number;
    name: string;
    code: number;
};

export type {IWeatherCity};