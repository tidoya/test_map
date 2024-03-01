import { featureChekedTypes } from './../featuresMap/types/types';
import { defineStore } from "pinia"
import { Map } from "maplibre-gl"
import { stateMapTypes } from "./types/types"
import { getImageCircle } from './model/getImageCircle';

export const useInstanceMap = defineStore('InstanceMap', {
  state: (): stateMapTypes => {
    return {
      instanceMap: null,
    }
  },
  getters: {
      getInstanceMap(state){
          return state.instanceMap
      }
  },
  actions: {
      async setInstanceMap(mapContainer: HTMLElement, CenterCoordinates: [number, number]){
          //@ts-ignore
          this.instanceMap = new Map({
            container: mapContainer,
            // if not work, update key https://cloud.maptiler.com/account/keys/
            style: "https://api.maptiler.com/maps/streets/style.json?key=3Z2h4Nzf4q0xcpcVIVZi" ,
            center: CenterCoordinates,
            zoom: 3,
          });
          //image
          const [width, data] = getImageCircle(64)
          this.instanceMap.addImage('custom-marker', { width, height: width, data });
          (mapContainer.querySelector('.maplibregl-canvas') as HTMLCanvasElement).style.borderRadius = '15px';
          (mapContainer.querySelector('.maplibregl-control-container') as HTMLElement).style.display = 'none'
      },
      async setFeaturesInMap(featuresObj: featureChekedTypes[]){
        if (!this.instanceMap) {
          console.log('Map instance not initialized');
          return;
        }
        // await new Promise<void>((resolve, reject) => {
        //   this.instanceMap?.on('style.load', () => {
        //       resolve();
        //   });
        //   this.instanceMap?.on('error', (error) => {
        //       reject(error.error);
        //   });
        // });

        

        const replaceFeaters = featuresObj.map(feature => feature.features)
        
        if (this.instanceMap.getSource('conferences')) {
          if (this.instanceMap.getLayer('conferences')) {
              this.instanceMap.removeLayer('conferences');
          }
          this.instanceMap.removeSource('conferences');
        }

        this.instanceMap.addSource(`conferences`, {
            'type': 'geojson',
            'data': {
                'type': 'FeatureCollection',
                'features': replaceFeaters
            }
        });
        this.instanceMap.addLayer({
          'id': 'conferences',
          'type': 'symbol',
          'source': 'conferences',
          'layout': {
              'icon-image': 'custom-marker',
              'text-field': ['get', 'name'],
              'text-font': [
                  'Open Sans Semibold',
                  'Arial Unicode MS Bold'
              ],
              'text-offset': [0, 1.25],
              'text-anchor': 'top'
          }
      });
      }
  }
})
  
  