import { defineStore } from "pinia"
import { RootState } from "./types"

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
    }
  })
  
  