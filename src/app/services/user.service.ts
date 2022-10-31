import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Child } from '../models/Child';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private URLGetChildren =
    'http://api.shield.kaisens.fr/api/users/raphael1992/childs/';
  constructor(private httpUser: HttpClient) {}
  private URLModifyUser = ' http://api.shield.kaisens.fr/api/users/test/';

  getUsersChildren(): Observable<Child[]> {
    return this.httpUser.get<Child[]>(this.URLGetChildren);
  }
  updateUser(user: User) {
    return this.httpUser.put(this.URLModifyUser, user);
  }

  getUser() {
    return this.httpUser.get<User>(this.URLModifyUser);
  }
}
