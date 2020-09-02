import { EntityRepository, Repository } from 'typeorm';
import { User } from '../entities/User';
import { IUser } from '../../common/models/IUser';

@EntityRepository(User)
class UserRepository extends Repository<User> {
  createUser(data: IUser): Promise<IUser> {
    const user = this.create(data);
    return user.save();
  }
  async getByEmail(id: string): Promise<IUser> {
    const user = await this.findOne(id);
    return user;
  }
}

export default UserRepository;
