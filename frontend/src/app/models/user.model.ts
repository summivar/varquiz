import { Studyset } from '@app/models';

export class User {
  id?: string;
  email?: string;
  isEmailActivated?: boolean;
  activationLink?: string;
  studysets?: Studyset[];
  banned?: boolean;
  banReason?: string;
  roles?: string[];
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}
