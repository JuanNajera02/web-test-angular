import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import { url } from '../url';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { users } from '../modules/main/pages/users/models/user.model';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private usersSubject = new BehaviorSubject<users[]>([]);
  users$ = this.usersSubject.asObservable();

  constructor(private http:HttpClient) {
    this.loadUsers();
  }

  private loadUsers(): void {
    this.getUsers().subscribe(users => {
      this.usersSubject.next(users);
    });
  }
  getUsers(): Observable<any> {
    return this.http.get(`${url}/api/Client/GetAllClients`)
  }

  createUser(user: users): Observable<any> {
    return this.http.post(`${url}/api/Client/AddClient`, user).pipe(
      tap(() => this.loadUsers())
    )
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${url}/api/Client/DeleteClient/${id}`);
  }

  updateUser(user: users): Observable<any> {
    return this.http.put(`${url}/api/Client/UpdateClient`, user).pipe(
      tap(() => this.loadUsers())
    )
  }


  private currentUserSubject = new BehaviorSubject<users | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  setCurrentUser(client: users): void {
    this.currentUserSubject.next(client);
  }

  clearCurrentUser(): void {
    this.currentUserSubject.next(null);
  }





}
