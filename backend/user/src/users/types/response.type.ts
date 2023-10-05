import { ObjectId } from 'mongodb';
import { Studyset } from '../../studysets/schemas';

export type UserResponse = {
  id: ObjectId,
  email: string,
  isEmailActivated: boolean,
  activationLink: string,
  studysets: Studyset[],
  banned: boolean,
  banReason: string,
  roles: string[],
  createdAt: string,
  updatedAt: string,
  __v: number,
}