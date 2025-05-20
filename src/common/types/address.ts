export interface LocationPoint {
  type: 'Point'
  coordinates: [number, number]
}

export interface AddressInterface {
  city?: string
  poiName: string
  poiAddress: string
  details?: string
  location?: LocationPoint
}