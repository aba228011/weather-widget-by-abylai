<script setup lang="ts">
import {onMounted, ref} from "vue";
import {getWeatherActs} from "@/actions/get-weather";
import Draggable from "vuedraggable";

const props = defineProps(['citiesList'])

const emit = defineEmits(['onChangePlace'])

onMounted(async () => await getDataByCityName(props.citiesList[0].cityName));
const getDataByCityName = async (cityName: string) => {
  try {
    await getWeatherActs.getByCityName(cityName)
  } catch (ex) {
    console.error(ex);
  }
};
const dragOptions = ref({
  group: 'items',
  handle: '.draggable-item', // Укажите здесь класс элементов, на которых должно срабатывать перетаскивание
});

const onChangePlace = (movedObj) => {
  emit('onChangePlace', {'newIndex': movedObj.moved.newIndex, 'oldIndex': movedObj.moved.oldIndex})
}
</script>

<template>
  <div>
    <draggable v-bind="dragOptions" :model-value="props.citiesList" @change="onChangePlace" item-key="id">
      <template #item="{ element }">
        <div class="d-flex justify-space-between" style="max-width: 344px; margin: 0 auto">
          <div class="drag-item draggable-item">
            change
          </div>
          <v-btn @click="$router.push(`/weather-info/${element.cityName}`)" variant="outlined">
            {{ element.cityName }}
          </v-btn>
          <div>x</div>
        </div>
      </template>
    </draggable>
  </div>
</template>

<style scoped>

</style>