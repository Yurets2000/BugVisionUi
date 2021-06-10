import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../models/User';
import {Observable} from 'rxjs';
import {apiUrls} from '../../api-urls';
import {TokenStorageService} from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly BASE_URL = apiUrls.USER_API_URL;

  constructor(private http: HttpClient,
              private tokenStorageService: TokenStorageService) {
  }

  public getById(id: string): Observable<User> {
    const url = `${this.BASE_URL}/${id}`;
    const headersVal = {
      Authorization: 'Bearer ' + this.tokenStorageService.getToken()
    };
    return this.http.get<User>(url, {headers: headersVal});
  }

  public update(user: User): Observable<User> {
    const headersVal = {
      Authorization: 'Bearer ' + this.tokenStorageService.getToken()
    };
    return this.http.put<User>(this.BASE_URL, user, {headers: headersVal});
  }
}
