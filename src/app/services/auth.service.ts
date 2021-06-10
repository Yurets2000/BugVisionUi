import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {apiUrls} from '../../api-urls';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly BASE_URL = apiUrls.AUTH_API_URL;

  constructor(private http: HttpClient) {
  }

  public login(credentials): Observable<any> {
    const url = this.BASE_URL + '/signin';
    return this.http.post(url, {
      username: credentials.username,
      password: credentials.password
    });
  }

  public register(user): Observable<any> {
    const url = this.BASE_URL + '/signup';
    return this.http.post(url, {
      username: user.username,
      email: user.email,
      password: user.password,
      name: user.name,
      surname: user.surname,
      age: user.age,
    });
  }
}
