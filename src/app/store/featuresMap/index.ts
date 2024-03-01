import { defineStore } from "pinia"
import { stateFeaturesMapTypes } from "./types/types"
import { minLatitude, maxLatitude, minLongitude, maxLongitude } from './constants/constants'
import { featureChekedTypes } from './types/types'

export const useFeaturesMap = defineStore('featuresMap', {
  state: (): stateFeaturesMapTypes => {
    return {
      featuresMap: [],
      activeFeatures: []
    }
  },
  getters: {
      getFeaturesMap(state){
          return state.featuresMap
      }
  },
  actions: {
      clearFeaturesMap() {
        this.featuresMap.length = 0
      },
      clearActiveFeatures() {
        this.activeFeatures.length = 0
      },
      setRandomFeatures(count: number) {
        for (let i = 0; i < count; i++) {
            const latitude = (Math.random() * (maxLatitude - minLatitude)) + minLatitude;
            const longitude = (Math.random() * (maxLongitude - minLongitude)) + minLongitude;
            this.featuresMap.push({
            id: `${i}-${latitude}${longitude}`,
            checked: i === 0 ? true : false,
            features: {
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: [longitude, latitude]
              },
              properties: {
                name: `№${i}`
              }
            }});
          }
      },
      setAllCheackedFeatures(typeChecked: boolean){
        this.featuresMap.forEach(feature => {
          feature.checked = typeChecked;
        });
        if(typeChecked){
          this.activeFeatures = [...this.featuresMap]
        }else{
          this.activeFeatures = []
        }
      },
      setActiveFeatures(feature: featureChekedTypes){
        this.activeFeatures.push(feature)
      }
      
  }
})
  
  