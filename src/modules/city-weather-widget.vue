<script setup lang="ts">
import {onMounted, ref, watch} from "vue";
import {getWeatherActs} from "@/actions/get-weather";
import {useRoute} from "vue-router";


const weatherData = ref<any>({} as any);
const route = useRoute()

onMounted(async () => await getDataByCityName(route.params.city as string));

// watch(
//     () => route.params.city,
//     async (city: string) => {
//       await getDataByCityName(city)
//     }
// )
const getDataByCityName = async (cityName: string) => {
  try {
    const res = await getWeatherActs.getByCityName(cityName)
    weatherData.value = strToXml(res)
  } catch (ex) {
    console.error(ex);
  }

  // let xhr = new XMLHttpRequest();
  // xhr.open('GET', `${import.meta.env.VITE_APP_WEATHER_API}?q=${cityName}&units=metric&APPID=${import.meta.env.VITE_APP_WEATHER_API_KEY}&mode=xml`);
  // xhr.send();
  // xhr.onload = function() {
  //   if (xhr.status != 200) { // анализируем HTTP-статус ответа, если статус не 200, то произошла ошибка
  //     alert(`Ошибка ${xhr.status}: ${xhr.statusText}`); // Например, 404: Not Found
  //   } else { // если всё прошло гладко, выводим результат
  //     console.log(xhr.response)
  //     console.log(typeof xhr.response)
  //
  //     weatherData.value = strToXml(xhr.response)
  //   }
  // };
}

function strToXml(strXml) {
  try {
    let text, parser, xmlDoc;
    text = strXml;
    parser = new DOMParser();
    xmlDoc = parser.parseFromString(text, "text/xml");

    const xmlObject = {}
    if (!!xmlDoc.all.length) {
      xmlObject[xmlDoc.all[0].nodeName] = {}
      const item = xmlDoc.getElementsByTagName(xmlDoc.all[0].nodeName)
      if (item[0].textContent === item[0].innerHTML) {
        xmlObject['contentValue'] = item[0].textContent
      } else {
        xmlObject['contentValue'] = ''
      }
      if (item[0].attributes.length) {
        for (let i = 0; i < item[0].attributes.length; i++) {
          xmlObject[xmlDoc.all[0].nodeName]['attributes'][item[0].attributes[i].name] = item[0].attributes[i].nodeValue;
        }
      }

      if (item[0].children.length) {
        for (let i = 0; i < item[0].children.length; i++) {
          xmlObject[xmlDoc.all[0].nodeName][item[0].children[i].nodeName] = recursiveReturnXmlNodeToObject(item[0].children[i]);
        }
      }
      return xmlObject;
    }
  } catch (e) {
    console.error(e)
    return null;
  }
}

function recursiveReturnXmlNodeToObject(item) {
  const obj = {}
  if (item.textContent === item.innerHTML) {
    obj['contentValue'] = item.textContent
  } else {
    obj['contentValue'] = ''
  }
  if (item.attributes.length) {
    obj['attributes'] = {};
    for (let i = 0; i < item.attributes.length; i++) {
      obj['attributes'][item.attributes[i].name] = item.attributes[i].nodeValue;
    }
  }
  if (item.children.length) {
    for (let i = 0; i < item.children.length; i++) {
      obj[item.children[i].nodeName] = recursiveReturnXmlNodeToObject(item.children[i]);
    }
  }
  return obj;
}
</script>

<template>
  <div>
    <v-card
        width="400"
        :title="`${weatherData?.current?.city?.attributes?.name}, ${weatherData?.current?.city?.country?.contentValue}`"
    >
      <div>Feels like {{ weatherData?.current?.feels_like?.attributes?.value }}°C.
        {{ weatherData?.current?.weather?.attributes?.value }}.
        {{ weatherData?.current?.wind?.speed?.attributes?.name }}
      </div>

      <div>
        <v-icon name="BiCompass" />
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