import { MovieModel } from './movie.model';

export interface UserModel {
  id?: number;
  email: string;
  name: string;
  password: string;
  booked: string[];
}

export enum ReviewModel {
  NONE = 0,
  LIKED = 1,
  DISLIKED = 2,
}

export interface BookedModel {
  title: string;
  imageUrl: string;
  showingDate: string;
  ticketCount: number;
  price: number;
}
