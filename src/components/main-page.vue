<template>
  <v-container>
    <v-row>
      <carbon-face-cool class="text-yellow text-3xl" />
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

<script lang="ts">
import {defineComponent} from 'vue';
import cityWeatherWidget from "@/components/city-weather-widget.vue";
import CityWeatherCardList from "@/components/city-weather-card-list.vue";
import {getWeatherActs} from "@/actions/get-weather";
import {strToXml} from '@/ts/XmlToObject-Functions';

export default defineComponent({
  name: "main-page",
  components: {CityWeatherCardList, cityWeatherWidget},
  data: () => ({
    weatherData: null,
    citiesList: [],
    cityName: null,
    isShowSettings: true,
    canEditWidget: true,
    currentLocation: null,
  }),
  async created() {
    await navigator.geolocation.getCurrentPosition(async (position) => {
      let lat: number = position.coords.latitude;
      let lon: number = position.coords.longitude;

      try {
        const res = await getWeatherActs.getByLatAndLon(lat, lon);
        this.currentLocation = strToXml(res);
        const isHaveCity = this.citiesList.find(item => item.current.city.attributes.name === this.currentLocation.current.city.attributes.name);
        if (!!!isHaveCity) {
          // this.citiesList.push(strToXml(res));
          localStorage.setItem('localCityWeather', JSON.stringify(strToXml(res)));
        }
      } catch (ex) {
        console.error(ex);
      }
    });

    if (!!JSON.parse(localStorage.getItem('canEditWidget'))) {
      this.canEditWidget = false;
    }

    const citiesFromLocalStorage = JSON.parse(localStorage.getItem('citiesList'));
    if (!!citiesFromLocalStorage) {
      this.citiesList = citiesFromLocalStorage;
    } else {
      this.citiesList = [];
    }
  },
  methods: {
    async addCity() {
      const res = await getWeatherActs.getByCityName(this.cityName);
      this.citiesList.push(strToXml(res))
      this.cityName = null;
    },
    onChangePlace(objMovedPositions) {
      if (objMovedPositions.oldIndex > objMovedPositions.newIndex) {
        this.citiesList.splice(objMovedPositions.newIndex, 0, this.citiesList[objMovedPositions.oldIndex]);
        this.citiesList.splice(objMovedPositions.oldIndex + 1, 1);
      } else {
        this.citiesList.splice(objMovedPositions.newIndex + 1, 0, this.citiesList[objMovedPositions.oldIndex]);
        this.citiesList.splice(objMovedPositions.oldIndex, 1);
      }
    },
    delCity(outputObj) {
      const findIndex = this.citiesList.findIndex(item => item.current.city.attributes.id === outputObj.id);
      this.citiesList.splice(findIndex, 1)
    },
    saveWidgetState() {
      localStorage.setItem('citiesList', JSON.stringify(this.citiesList));
      localStorage.setItem('canEditWidget', JSON.stringify(true));
      this.canEditWidget = false;
    }
  }
})
</script>

<style scoped>

</style>