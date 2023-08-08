// *****---*****

export interface Forecast {
    current: Current;
    contentValue: string;
}

// ----------------

interface Current {
    city: City;
    clouds: Clouds;
    feels_like: FeelsLike;
    humidity: Humidity;
    lastupdate: Lastupdate;
    precipitation: Precipitation;
    pressure: Pressure;
    temperature: Temperature;
    visibility: Visibility;
    wind: Wind;
    contentValue: string;
}

// ----------------

interface City {
    attributes: IdNameType;
    contentValue: string;
    coord: Coord;
    country: Country;
    sun: Sun;
    timezone: Timezone;
}

interface IdNameType {
    id: number;
    name: string;
}

interface Coord {
    attributes: LatLonType;
    contentValue: string;
}

interface LatLonType {
    lat: number;
    lon: number;
}

interface Country {
    contentValue: string;
}

interface Sun {
    attributes: RiseSetType;
    contentValue: string;
}

interface RiseSetType {
    Rise: string;
    Set: string;
}

interface Timezone {
    contentValue: string;
}

//  -----------------

interface Clouds {
    attributes: NameValueType;
    contentValue: string;
}

interface NameValueType {
    name: string;
    value: string;
}

// ----------------

interface FeelsLike {
    attributes: UnitValueType;
    contentValue: string;
}

interface UnitValueType {
    unit: string;
    value: string;
}

// ----------------

interface Humidity {
    attributes: UnitValueType
    contentValue: string;
}

// ----------------

interface Lastupdate {
    attributes: ValueType;
    contentValue: string;
}

interface ValueType {
    value: string;
}

// ----------------

interface Precipitation {
    attributes: ModeType;
    contentValue: string;
}

interface ModeType {
    mode: string;
}

// ----------------

interface Pressure {
    attributes: UnitValueType;
    contentValue: string;
}

// ----------------

interface Temperature {
    attributes: MaxMinType & UnitValueType;
    contentValue: string;
}

interface MaxMinType {
    max: string;
    min: string;
}

// ----------------

interface Visibility {
    attributes: ValueType;
    contentValue: string;
}

// ----------------

interface Weather {
    attributes: IconNumberType & ValueType;
    contentValue: string;
}

interface IconNumberType {
    icon: string;
    number: string;
}

// ----------------

interface Wind {
    contentValue: string;
    direction: Direction;
    gusts: Gusts;
    speed: Speed;

}

interface Direction {
    attributes: CodeNameType & ValueType;
    contentValue: string;
}

interface CodeNameType {
    code: string;
    name: string;
}

interface Gusts {
    contentValue: string;
}

interface Speed {
    attributes: NameUnitType & ValueType;
    contentValue: string;
}

interface NameUnitType {
    name: string;
    unit: string;
}

// export Forecast;