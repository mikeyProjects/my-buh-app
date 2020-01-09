import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, filter, map } from 'rxjs/operators';
import { User } from '../shared/user/user';
import { NotificationService } from '../shared/components/notification/notification.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated: boolean;

  constructor(
    private http: HttpClient,
    private notificationService: NotificationService
  ) {
  }

  login(userForLogin: User): Observable<any> {
    return this.http.get(`http://localhost:3000/users?email=${userForLogin.email}`).pipe(
      map((users: User[]) => {
        const user: User = users[0];

        if (user) {
          if (user.password === userForLogin.password) {
            this.isAuthenticated = true;
            localStorage.setItem('user', JSON.stringify(userForLogin));
            return;
          } else {
            throw new Error('Неверный пароль');
          }
        } else {
          throw new Error('Пользователь не найден');
        }
      })
    );
  }

  registration(user: User): Observable<User> {
    return this.http.post('http://localhost:3000/users', user).pipe(
      map((users: User[]) => {
        return users[0];
      })
    );
  }

  logout() {
    this.isAuthenticated = false;
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }
}
