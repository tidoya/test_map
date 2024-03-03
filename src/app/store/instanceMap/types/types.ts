import { Map, Popup } from "maplibre-gl";

export interface stateMapTypes {
  instanceMap: null | Map
}
export interface propertiesTypes {
  [key: string]: string
}
export interface MapClickEvent {
  lngLat: {
      lng: number;
      lat: number;
  };
  originalEvent: PointerEvent; 
  point: {
      x: number;
      y: number;
  };
  target: Map; 
  type: string; 
  _defaultPrevented: boolean;
  defaultPrevented: boolean;
}

