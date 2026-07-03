import * as L from 'leaflet';

export enum TourType {
  Hike="foot-hiking",
  Bike="cycling-regular",
}

export interface Location {
  latitude: number;
  longitude: number;
  address: string;
}

export interface TourModel {
  id: number;
  title: string
  type: TourType
  description: string
  distance: number
  duration: number
  from: Location;
  to: Location;
  logs: TourLogModel[]
}

export interface TourLogModel {
  id: number;
  tourId: number;
  creationDate: Date
  comment: string;
  distance: number;
  duration: number;
  rating: number;
  difficulty: number;
}
