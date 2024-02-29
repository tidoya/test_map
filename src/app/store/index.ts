import { defineStore } from "pinia"
import { Map } from "maplibre-gl"
interface RootState {
  instanceMap: null | Map
}
export const useInstanceMap = defineStore('InstanceMap', {
  state: (): RootState => {
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
      setInstanceMap(mapContainer: HTMLElement, CenterCoordinates: [number, number]){
          //@ts-ignore
          this.instanceMap = new Map({
            container: mapContainer,
            // if not work, update key https://cloud.maptiler.com/account/keys/
            style: "https://api.maptiler.com/maps/streets/style.json?key=3Z2h4Nzf4q0xcpcVIVZi" ,
            center: CenterCoordinates,
            zoom: 8,
          });
          (mapContainer.querySelector('.maplibregl-canvas') as HTMLCanvasElement).style.borderRadius = '15px';
          (mapContainer.querySelector('.maplibregl-control-container') as HTMLElement).style.display = 'none'
      }
  }
})
  
  