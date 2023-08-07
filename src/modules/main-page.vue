<template>
    <v-container>
        <v-row>
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
            <city-weather-widget/>
        </v-row>

        <v-row v-else>
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
        <v-row>
            <v-btn v-if="!isShowSettings" @click="saveWidgetState">
                Save
            </v-btn>
        </v-row>
    </v-container>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import cityWeatherWidget from "@/modules/city-weather-widget.vue";
import CityWeatherCardList from "@/modules/city-weather-card-list.vue";
import {getWeatherActs} from "@/actions/get-weather";
import {strToXml} from '@/js/XmlToObject-Functions.js';

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
            let lat = position.coords.latitude;
            let lon = position.coords.longitude;

            try {
                const res = await getWeatherActs.getByLatAndLon(lat, lon);
                this.currentLocation = strToXml(res)
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
        },
        saveWidgetState() {
            localStorage.setItem('citiesList', JSON.stringify(this.citiesList));
            localStorage.setItem('canEditWidget', JSON.stringify(true));
        }
    }
})
</script>

<style scoped>

</style>