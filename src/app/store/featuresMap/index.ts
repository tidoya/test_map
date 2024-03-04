import { defineStore } from "pinia";
import { stateFeaturesMapTypes } from "./types/types";
import { minLatitude, maxLatitude, minLongitude, maxLongitude } from './constants/constants';
import { featureChekedTypes } from './types/types';
import { generateRandomFeatureId } from "./model/generateRadomFeatureId";
import { propertiesTypes } from "../instanceMap/types/types";

export const useFeaturesMap = defineStore('featuresMap', {
  state: (): stateFeaturesMapTypes => ({
    featuresMap: [],
    activeFeatures: [],
    activeSingleFeature: null,
    filteredFeaturesMap: []
  }),
  getters: {
    getFeaturesMap(state) {
      return state.featuresMap;
    },
    getActiveFeaturesMap(state) {
      return state.activeFeatures;
    },
    getActiveSingleFeaturesMap(state) {
      return state.activeSingleFeature;
    },
    getFilteredFeaturesMap(state) {
      return state.filteredFeaturesMap;
    }
  },
  actions: {
    clearFeaturesMap() {
      this.featuresMap = [];
    },
    clearActiveFeatures() {
      this.activeFeatures = [];
    },
    clearActiveSingleFeatures() {
      this.activeSingleFeature = null;
    },
    setActiveSingleFeature(feature: featureChekedTypes){
      this.activeSingleFeature = feature;
    },
    setRandomFeatures(count: number) {
      for (let i = 0; i < count; i++) {
        const latitude = Math.random() * (maxLatitude - minLatitude) + minLatitude;
        const longitude = Math.random() * (maxLongitude - minLongitude) + minLongitude;
        const id = generateRandomFeatureId(i,latitude, longitude);
        const checked = false;
        this.featuresMap.push({
          id,
          checked,
          features: {
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [longitude, latitude]
            },
            properties: {
              name: `Точка №${i+1}`,
              code: '234567890234',
              address: `ул. 5-я Парковая, 33-${Math.floor(Math.random() * 100) + 1 + i}`
            }
          }
        });
        this.filteredFeaturesMap.push({
          id,
          checked,
          features: {
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [longitude, latitude]
            },
            properties: {
              name: `Точка №${i+1}`,
              code: '234567890234',
              address: `ул. 5-я Парковая, 33-${Math.floor(Math.random() * 100) + 1 + i}`
            }
          }
        })
      }
      
    },
    setAllCheckedFeatures(typeChecked: boolean) {
      this.featuresMap.forEach(feature => {
        feature.checked = typeChecked;
      });
      this.activeFeatures = typeChecked ? [...this.featuresMap] : [];
    },
    toggleActiveFeature(feature: featureChekedTypes) {
      feature.checked = !feature.checked;
      const index = this.activeFeatures.findIndex(f => f.id === feature.id);
      if (feature.checked && index === -1) {
        this.activeFeatures.push(feature);
      } else if (!feature.checked && index !== -1) {
        this.activeFeatures.splice(index, 1);
      }
    },
    deleteActiveFeatures(feature: featureChekedTypes) {
      this.activeFeatures = this.activeFeatures.filter(f => f.id !== feature.id);
    },
    filterFeatures(searchTerm: string){
      this.filteredFeaturesMap = this.featuresMap.filter(feature =>{
        return (feature.features.properties as propertiesTypes).address.toLowerCase().includes(searchTerm.toLowerCase())  
      })
    }
  }
});
