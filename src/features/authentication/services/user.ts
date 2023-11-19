import { http } from '@lib/http';
import { UserResponse } from '../model/user';

export default class UserService {
  static async getUserById(id: string) {
    return await http().get<UserResponse>(`/api/users/${id}`);
  }
}
