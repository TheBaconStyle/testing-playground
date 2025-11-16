import { InjectDrizzle } from '@knaadh/nestjs-drizzle-pg';
import { Injectable } from '@nestjs/common';
import { DB, DB_TAG } from 'src/db/db.config';

@Injectable()
export class UsersService {
  constructor (@InjectDrizzle(DB_TAG) qwe: DB) {}

  create(createUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
