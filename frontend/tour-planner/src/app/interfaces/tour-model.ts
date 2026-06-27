export enum TourType {
  Hike="hike",
  Bike="bike",
}

export interface TourModel {
  id: number;
  title: string
  type: TourType
  description?: string
  distance: number
  duration: number
  from: string;
  to: string;
  logs: TourLogModel[]
}

export interface TourLogModel {
  id: number;
  creationDate: Date
  comment: string;
  distance: number;
  duration: number;
  rating: number;
  difficulty: number;
}
