import { MovieModel } from './movie.model';

export interface UserModel {
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
