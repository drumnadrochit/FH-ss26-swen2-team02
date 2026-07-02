import {TourModel, TourType, Location} from '../tour.model';

export type TourResponseDTO = Omit<TourModel, "logs">
export type TourRequestDTO = Omit<TourModel, "id"  | "logs">

