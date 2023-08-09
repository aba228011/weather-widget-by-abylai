import type {Forecast} from "@/types";
import {ref} from "vue";

export function strToXml(strXml: string): Forecast {
    try {
        let text, parser, xmlDoc;
        text = strXml;
        parser = new DOMParser();
        xmlDoc = parser.parseFromString(text, "text/xml");
        const xmlObject: Forecast = {} as Forecast;
        // const xmlObject1 = ref<Forecast>({} as Forecast);
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

function recursiveReturnXmlNodeToObject(item: any) {
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