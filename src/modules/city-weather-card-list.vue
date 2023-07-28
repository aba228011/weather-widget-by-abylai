<script setup lang="ts">
import {onMounted, ref} from "vue";
import {getWeatherActs} from "@/actions/get-weather";

const props = defineProps(['citiesList'])

onMounted(async () => await getDataByCityName('London'));

const getDataByCityName = async (cityName: string) => {
  try {
    const res = await getWeatherActs.getByCityName(cityName)
  } catch (ex) {
    console.error(ex);
  }
}
</script>

<template>
  <div>
    <v-card
        v-for="(city, ind) in props.citiesList" :key="ind"
        class="mx-auto"
        max-width="344"
        variant="outlined"
    >
      <v-card-item>
        <div class="d-flex justify-space-between">
          <div>change</div>
          <v-btn @click="$router.push(`/weather-info/${city}`)" variant="outlined">
            {{ city }}
          </v-btn>
          <div>x</div>
        </div>
      </v-card-item>
    </v-card>
  </div>
</template>

<style scoped>

</style>