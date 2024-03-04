import { Injectable, inject } from '@angular/core';
import { IUser } from '../interfaces/iuser.interface';
import { HttpClient } from '@angular/common/http';
import { Observable, lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  HttpClient = inject(HttpClient)

  // Importo los datos con observables

  getAll(page : number): Observable <IUser[]> {
    return this.HttpClient.get<IUser[]>(`https://peticiones.online/api/users?page=${page}` )
  }

  // // Importación con promesas
  // getAllPromises(): Promise<IUser[]> {
  //   return lastValueFrom (this.HttpClient.get<IUser[]>(this.urlBase))
  // }

}
