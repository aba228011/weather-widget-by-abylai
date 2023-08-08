<script setup lang="ts">
import { ref } from "vue";
import Draggable from "vuedraggable";
import type {Forecast} from "@/types";

const props = defineProps({
  citiesList: Array<Forecast>
});

const emit = defineEmits(['onChangePlace', 'delCity']);

const dragOptions = ref({
  group: 'items',
  handle: '.draggable-item', // Укажите здесь класс элементов, на которых должно срабатывать перетаскивание
});

const onChangePlace = (movedObj: any) => {
  emit('onChangePlace', {'newIndex': movedObj.moved.newIndex, 'oldIndex': movedObj.moved.oldIndex})
};
const delCity = (id) => {
  emit('delCity', {'id': id})
};
</script>

<template>
  <div>
    <draggable v-bind="dragOptions" :model-value="props.citiesList" @change="onChangePlace"
               item-key="current.city.attributes.id">
      <template #item="{ element }">
        <div class="d-flex justify-space-between" style="max-width: 344px; margin: 0 auto">
          <div class="drag-item draggable-item">
            change
          </div>
          <v-btn variant="outlined">
            {{ element.current.city.attributes.name }}
          </v-btn>
          <v-btn @click="delCity(element.current.city.attributes.id)" variant="elevated">
            x
          </v-btn>
        </div>
      </template>
    </draggable>
  </div>
</template>

<style scoped>

</style>