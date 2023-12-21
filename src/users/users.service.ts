import { Injectable } from '@nestjs/common';

// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {
  private readonly users = [
    {
      userId: 1,
      username: 'john',
      password: 'changeme',
      permissons: ['READ:Class', 'READ:Attendance', 'READ:data'],
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
      permissons: ['READ:Class', 'UPDATE:Attendance'],
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }
}
