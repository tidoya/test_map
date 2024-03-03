
import { FeatureTypes } from "./geojson.types"
type longitude = number
type latitude = number
export type coordinateTypes = [longitude, latitude]

export interface featureChekedTypes { 
  id: string,
  features: FeatureTypes,
  checked: boolean
}
export interface stateFeaturesMapTypes {
  featuresMap: featureChekedTypes[]
  activeFeatures: featureChekedTypes[]
  activeSingleFeature: featureChekedTypes | null
}