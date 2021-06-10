import {Injectable} from '@angular/core';
import {UserDetails} from '../models/UserDetails';

const TOKEN_KEY = 'auth-token';
const USER_DETAILS_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() {
  }

  public signOut(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_DETAILS_KEY);
  }

  public saveToken(token: string): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    return localStorage.getItem(TOKEN_KEY);
  }

  public saveUserDetails(userDetails): void {
    localStorage.removeItem(USER_DETAILS_KEY);
    localStorage.setItem(USER_DETAILS_KEY, JSON.stringify(userDetails));
  }

  public getUserDetails(): UserDetails {
    return JSON.parse(localStorage.getItem(USER_DETAILS_KEY));
  }
}
