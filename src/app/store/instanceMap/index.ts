import { defineStore } from "pinia";
import { LngLat, Map, MapGeoJSONFeature, MapMouseEvent, Popup } from "maplibre-gl";
import { propertiesTypes, stateMapTypes } from "./types/types";
import { getImageCircle } from './model/getImageCircle';
import { featureChekedTypes, coordinateTypes } from './../featuresMap/types/types';
import { createApp } from "vue";
import { getPopupContent } from "./model/getPopupContent";

export const useInstanceMap = defineStore('InstanceMap', {
  state: (): stateMapTypes => ({
    instanceMap: null,
  }),
  getters: {
    getInstanceMap: (state) => state.instanceMap,
  },
  actions: {
    async setInstanceMap(mapContainer: HTMLElement, centerCoordinates: coordinateTypes) {
      try {
        if (this.instanceMap) return; 
        //@ts-ignore
        this.instanceMap = new Map({
          container: mapContainer,
          // if not work, update key https://cloud.maptiler.com/account/keys/
          style: "https://api.maptiler.com/maps/streets/style.json?key=3Z2h4Nzf4q0xcpcVIVZi",
          center: centerCoordinates,
          zoom: 3,
        });

        const [width, data] = getImageCircle(64);
        this.instanceMap.addImage('custom-marker', { width, height: width, data });

        await new Promise<void>((resolve, reject) => {
          this.instanceMap?.on('style.load', resolve);
          this.instanceMap?.on('error', (error) => reject(error.error));
        });

        const canvasElement = mapContainer.querySelector('.maplibregl-canvas') as HTMLCanvasElement;
        if (canvasElement) {
          canvasElement.style.borderRadius = '15px';
        }

        const controlContainer = mapContainer.querySelector('.maplibregl-control-container') as HTMLElement;
        if (controlContainer) {
          controlContainer.style.display = 'none';
        }

        this.instanceMap.on('click', 'conferences', (e: MapMouseEvent & { features?: MapGeoJSONFeature[] | undefined }) => {
          if (e.features) {
            const feature = e.features[0];
            if (feature.geometry.type === 'Point') { 
                const coordinates = feature.geometry.coordinates.slice() as coordinateTypes;
                const { address, code, name } = feature.properties;
                while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                    coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                }
                this.openModalAtCoordinates(coordinates, { name, code, address });
            }
        }
      });
      } catch (error) {
        console.error("Error setting up instance map:", error);
      }
    },

    async setFeaturesInMap(featuresObj: featureChekedTypes[]) {
      try {
        if (!this.instanceMap) {
          console.log('Map instance not initialized');
          return;
        }

        const replaceFeatures = featuresObj.flatMap(feature => feature.features);

        if (this.instanceMap.getSource('conferences')) {
          this.instanceMap.removeLayer('conferences');
          this.instanceMap.removeSource('conferences');
        }

        this.instanceMap.addSource('conferences', {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: replaceFeatures
          }
        });

        this.instanceMap.addLayer({
          id: 'conferences',
          type: 'symbol',
          source: 'conferences',
          layout: {
            'icon-image': 'custom-marker',
            'text-field': ['get', 'name'],
            'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
            'text-offset': [0, 1.25],
            'text-anchor': 'top'
          }
        })
      } catch (error) {
        console.error("Error setting features in map:", error);
      }
    },
    setActiveFeatureInMap(coodinate: coordinateTypes){
      if (!this.instanceMap) return; 
      this.instanceMap.flyTo({
        center: coodinate,
        essential: true,
        zoom: 10 
      });
    },
    openModalAtCoordinates(coordinates: coordinateTypes, properties: propertiesTypes) {
      if (!this.instanceMap) return; 
      this.removeAllModalWindow()
      
      const popup = new Popup({
        closeButton: false
      })
        .setLngLat(coordinates)
        .setHTML(getPopupContent(properties));
        
      popup.addTo(this.instanceMap as Map);
      const heightPopup = this.instanceMap._container?.querySelector('#popupContentInMap')?.clientHeight
      heightPopup && popup.setOffset([9, -630 -heightPopup]); 
      console.log('Opening modal at coordinates:', coordinates);
    },
    removeAllModalWindow(){
      if (!this.instanceMap) return;
      const popups = this.instanceMap._container.getElementsByClassName('maplibregl-popup')
      for (var i = 0; i < popups.length; i++) {
        popups[i].remove();
      }
    }
  }
});
