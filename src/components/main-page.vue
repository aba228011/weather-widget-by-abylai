<script setup lang="ts">
import {onMounted, ref} from 'vue';
import CityWeatherCardList from "@/components/city-weather-card-list.vue";
import {getWeatherActs} from "@/actions/get-weather";
import {strToXml} from '@/ts/XmlToObject-Functions';
import type {Forecast} from "@/types";

let citiesList = ref<Array<Forecast>>([] as Array<Forecast>);
let cityName = ref<string>('');
let isShowSettings = ref<boolean>(true);
let canEditWidget = ref<boolean>(true);
let currentLocation = ref<Forecast>({} as Forecast);

onMounted(async () => {
  await navigator.geolocation.getCurrentPosition(async (position) => {
    let lat: number = position.coords.latitude;
    let lon: number = position.coords.longitude;

    try {
      const res = await getWeatherActs.getByLatAndLon(lat, lon);
      currentLocation.value = strToXml(res);
      const isHaveCity = citiesList.value.find(item => item.current.city.attributes.name === currentLocation.value.current.city.attributes.name);
      if (!!!isHaveCity) {
        localStorage.setItem('localCityWeather', JSON.stringify(strToXml(res)));
      }
    } catch (ex) {
      console.error(ex);
    }
  });

  if (!!JSON.parse(localStorage.getItem('canEditWidget'))) {
    canEditWidget.value = false;
  }

  const citiesFromLocalStorage = JSON.parse(localStorage.getItem('citiesList'));
  if (!!citiesFromLocalStorage) {
    citiesList.value = citiesFromLocalStorage;
  } else {
    citiesList.value = [];
  }
})
const addCity = async () => {
  const res = await getWeatherActs.getByCityName(cityName.value);
  citiesList.value.push(strToXml(res))
  cityName.value = null;
}

const onChangePlace = (objMovedPositions) => {
  if (objMovedPositions.oldIndex > objMovedPositions.newIndex) {
    citiesList.value.splice(objMovedPositions.newIndex, 0, citiesList.value[objMovedPositions.oldIndex]);
    citiesList.value.splice(objMovedPositions.oldIndex + 1, 1);
  } else {
    citiesList.value.splice(objMovedPositions.newIndex + 1, 0, citiesList.value[objMovedPositions.oldIndex]);
    citiesList.value.splice(objMovedPositions.oldIndex, 1);
  }
}

const delCity = (outputObj) => {
  const findIndex = citiesList.value.findIndex(item => item.current.city.attributes.id === outputObj.id);
  citiesList.value.splice(findIndex, 1)
}

const saveWidgetState = () => {
  localStorage.setItem('citiesList', JSON.stringify(citiesList.value));
  localStorage.setItem('canEditWidget', JSON.stringify(true));
  canEditWidget.value = false;
  isShowSettings.value = true;
}
</script>

<template>
  <v-container>
    <v-row>
      <carbon-face-cool class="text-yellow text-3xl"/>
      <v-col cols="12">
        <v-btn @click="isShowSettings = !isShowSettings" :disabled="!canEditWidget">Settings</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <div>
        Current location: {{ currentLocation?.current?.city?.attributes?.name }}
      </div>
    </v-row>
    <v-row v-if="isShowSettings">
      <div>Local weather</div>
      <city-weather-widget :weather-data="currentLocation"/>
      <city-weather-widget class="mt-5" v-for="city in citiesList" :weather-data="city"/>
    </v-row>

    <v-row v-else>
      <v-col cols="12">
        <city-weather-card-list :cities-list="citiesList" @on-change-place="onChangePlace" @del-city="delCity"/>

        <div class="d-flex justify-space-between">
          <v-text-field
              style="width: 400px"
              label="Add Location:"
              placeholder="City name"
              v-model="cityName"
              full-width
              dense
              outlined
              shaped
          ></v-text-field>

          <v-btn density="compact" @click="addCity">🏸</v-btn>
        </div>

      </v-col>
    </v-row>
    <v-row>
      <v-btn v-if="!isShowSettings" @click="saveWidgetState">
        Save
      </v-btn>
    </v-row>
  </v-container>
</template>

<style scoped>

</style>