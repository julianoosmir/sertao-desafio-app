import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {CookieService} from "ngx-cookie-service";
import {HttpClient} from "@angular/common/http";
import {URL_LOGIN} from "../contants/api";
import {jwtDecode} from "jwt-decode";
import {JwtDto} from "../interfaces /JwtDto";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public username: any;
  public senha: any;
  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor(private cookieService: CookieService,private http: HttpClient) { }

  setToken(token: string) {
    this.cookieService.set( 'token', token );
  }
  getRole(){
    const token = this.getToken();
    const decoded = jwtDecode(token);
    const jwt = decoded as JwtDto;
    return jwt.role[0].name;
  }
  getToken(){
    return this.cookieService.get('token');
  }

  logged(){
    this.loggedIn.next(true);
  }

  login(username: string, senha: string){
    return this.http
      .post(URL_LOGIN, {
        username: username,
        password: senha
      }, { responseType: "text" });
  }

  isUserLoggedIn() {
    let isLoggedIn = this.getToken();
    isLoggedIn === "" ? this.loggedIn.next(false) : this.loggedIn.next(true)
    return this.loggedIn.asObservable();
  }

  logout() {
    this.cookieService.delete('token');
  }
}
