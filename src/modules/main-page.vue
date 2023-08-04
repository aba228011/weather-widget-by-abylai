<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <div @click="isShowSettings = !isShowSettings">Settings</div>
      </v-col>
    </v-row>
    <v-row v-if="isShowSettings">
      <v-col cols="12">
        <city-weather-card-list :citiesList="citiesList" @onChangePlace="onChangePlace"/>

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
// import Draggable from "vuedraggable";

export default defineComponent({
  name: "main-page",
  components: {CityWeatherCardList, cityWeatherWidget},
  data: () => ({
    weatherData: null,
    citiesList: [
      {
        id: 1,
        cityName: "London",
      },
      {
        id: 2,
        cityName: "Moscow",
      },
      {
        id: 3,
        cityName: "Berlin",
      },
    ],
    cityName: null,
    isShowSettings: true,
  }),
  methods: {
    addCity() {
      const id = this.citiesList.length;
      const cityObj = {
        id: id,
        cityName: this.cityName
      };
      this.citiesList.push(cityObj);

    },
    onChangePlace(objMovedPositions) {
      if (objMovedPositions.oldIndex > objMovedPositions.newIndex) {
        this.citiesList.splice(objMovedPositions.newIndex, 0, this.citiesList[objMovedPositions.oldIndex]);
        this.citiesList.splice(objMovedPositions.oldIndex + 1, 1);
      } else {
        this.citiesList.splice(objMovedPositions.newIndex + 1, 0, this.citiesList[objMovedPositions.oldIndex]);
        this.citiesList.splice(objMovedPositions.oldIndex, 1);
      }
    }
  }
})
</script>

<style scoped>

</style>