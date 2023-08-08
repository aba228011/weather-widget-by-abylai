<script setup lang="ts">
import type {Forecast} from "@/types";

defineProps<{ weatherData: Forecast }>();
</script>

<template>
  <div>
    <v-card
        class="ma-4 pa-3"
        width="400"
        :title="`${weatherData?.current?.city?.attributes?.name}, ${weatherData?.current?.city?.country?.contentValue}`"
    >
      <div>Feels like {{ weatherData?.current?.feels_like?.attributes?.value }}°C.
        {{ weatherData?.current?.weather?.attributes?.value }}.
        {{ weatherData?.current?.wind?.speed?.attributes?.name }}
      </div>

      <div>
        <v-icon name="BiCompass"/>
        {{ weatherData?.current?.wind?.speed?.attributes?.value }}
        {{ weatherData?.current?.wind?.speed?.attributes?.unit }}
        {{ weatherData?.current?.wind?.direction?.attributes?.code }}
      </div>
      <div>
        {{ weatherData?.current?.pressure?.attributes?.value }} {{ weatherData?.current?.pressure?.attributes?.unit }}
      </div>
      <div>
        {{ weatherData?.current?.pressure?.value }} {{ weatherData?.current?.pressure?.unit }}
      </div>
      <div>
        Humidity: {{ weatherData?.current?.humidity?.attributes?.value }}
        {{ weatherData?.current?.humidity?.attributes?.unit }}
      </div>
      <div>
        Visibility: {{ weatherData?.current?.visibility?.attributes?.value / 1000 }} km
      </div>
    </v-card>
  </div>
</template>

<style scoped>

</style>