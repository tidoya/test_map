import { FeatureTypes } from "./geojson.types"

export interface featureChekedTypes { 
  id: string,
  features: FeatureTypes,
  checked: boolean
}
export interface stateFeaturesMapTypes {
  featuresMap: featureChekedTypes[]
  activeFeatures: featureChekedTypes[]
}