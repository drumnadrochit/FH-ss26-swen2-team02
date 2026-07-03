import {TourModel, TourType, Location, TourLogModel} from '../tour.model';

export type TourResponseDTO = Omit<TourModel, "logs">
export type TourRequestDTO = Omit<TourModel, "id"  | "logs">

export type TourLogRequestDTO = Omit<TourLogModel, "id" >
export type TourLogResponseDTO = Omit<TourLogModel, "tourId">
