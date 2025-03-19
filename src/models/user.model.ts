import { MovieModel } from './movie.model';

export interface UserModel {
  id?: number;
  email: string;
  name: string;
  lastName: string;
  password: string;
  phoneNumber: string;
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
