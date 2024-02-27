import { Injectable } from '@angular/core';
import { IUser } from '../interfaces/iuser.interface';
import { USERS } from '../db/users';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private arrUsers : IUser [] = USERS

  constructor() { }

  getAllUsers () : IUser[] {
    return this.arrUsers
  }
}
