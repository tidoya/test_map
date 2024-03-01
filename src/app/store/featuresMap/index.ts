import { defineStore } from "pinia";
import { stateFeaturesMapTypes } from "./types/types";
import { minLatitude, maxLatitude, minLongitude, maxLongitude } from './constants/constants';
import { featureChekedTypes } from './types/types';

export const useFeaturesMap = defineStore('featuresMap', {
  state: (): stateFeaturesMapTypes => ({
    featuresMap: [],
    activeFeatures: []
  }),
  getters: {
    getFeaturesMap(state) {
      return state.featuresMap;
    },
    getActiveFeaturesMap(state) {
      return state.activeFeatures;
    }
  },
  actions: {
    clearFeaturesMap() {
      this.featuresMap = [];
    },
    clearActiveFeatures() {
      this.activeFeatures = [];
    },
    generateRandomFeatureId(latitude: number, longitude: number): string {
      return `${latitude}-${longitude}`;
    },
    setRandomFeatures(count: number) {
      for (let i = 0; i < count; i++) {
        const latitude = Math.random() * (maxLatitude - minLatitude) + minLatitude;
        const longitude = Math.random() * (maxLongitude - minLongitude) + minLongitude;
        const id = this.generateRandomFeatureId(latitude, longitude);
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
              name: `№${i}`
            }
          }
        });
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
  }
});
