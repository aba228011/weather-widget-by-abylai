<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <div @click="isShowSettings = !isShowSettings">Settings</div>
      </v-col>
    </v-row>
    <v-row v-if="isShowSettings">
      <v-col cols="12">
        <city-weather-card-list :citiesList="citiesList" />

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
    <v-row v-else>
      <city-weather-widget/>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import cityWeatherWidget from "@/modules/city-weather-widget.vue";
import CityWeatherCardList from "@/modules/city-weather-card-list.vue";

export default defineComponent({
  name: "main-page",
  components: {CityWeatherCardList, cityWeatherWidget},
  data: () => ({
    weatherData: null,
    citiesList: ['London', 'Moscow'],
    cityName: '',
    isShowSettings: true,
  }),
  methods: {
    addCity() {
      this.citiesList.push(this.cityName);
    }
  }
})
</script>

<style scoped>

</style>