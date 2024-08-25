import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from '../../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  BASE_URL = `${environment.API_URL}/api/users`;

  constructor(
    private router: Router,
    private http: HttpClient,
    private snackBar: MatSnackBar,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  getUsers() {
    return this.http
      .get(`${this.BASE_URL}`, { headers: { requireToken: 'true' } })
      .pipe(
        map((data: any) => {
          return data.objeto;
        }),

        catchError((error) => this.handlerError(error.mensaje))
      );
  }

  insertUser(data: any) {
    return this.http
      .post(`${this.BASE_URL}/insert`, data, {
        headers: { requireToken: 'true' },
      })
      .pipe(
        map((data: any) => {
          return data.mensaje;
        }),

        catchError((error) => this.handlerError(error.mensaje))
      );
  }

  updateUser(data: any) {
    return this.http
      .post(`${this.BASE_URL}/update`, data, {
        headers: { requireToken: 'true' },
      })
      .pipe(
        map((data: any) => {
          return data.mensaje;
        }),

        catchError((error) => this.handlerError(error.mensaje))
      );
  }

  deleteUser(data: any) {
    return this.http
      .post(`${this.BASE_URL}/delete`, data, {
        headers: { requireToken: 'true' },
      })
      .pipe(
        map((data: any) => {
          return data.mensaje;
        }),

        catchError((error) => this.handlerError(error.mensaje))
      );
  }

  getRoles(): Observable<any[]> {
    return this.http
      .get<any[]>(`${environment.API_URL}/api/rol/getRolesUso`, {
        headers: { requireToken: 'true' },
      })
      .pipe(catchError((error) => this.handlerError(error)));
  }

  private handlerError(error: any) {
    var errorMessage = 'Ocurrió un error';

    if (error.error) {
      if (error.error.message) errorMessage = error.error.message;
      else errorMessage = 'Ocurrió un error';
    }

    this.snackBar.open(errorMessage, '', { duration: 3000 });

    return throwError(() => {
      new Error(errorMessage);
    });
  }
}
