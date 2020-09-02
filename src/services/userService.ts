import { getCustomRepository } from 'typeorm';
import UserRepository from '../data/repositories/userRepository';
import { IUser } from '../common/models/IUser';

export const getUserById = async (id: string) => {
  const user = await getCustomRepository(UserRepository).getByEmail(id);
  return user;
};

export const createNewUser = async (data: IUser) => {
  const user = await getCustomRepository(UserRepository).createUser(data);
  return user;
};
