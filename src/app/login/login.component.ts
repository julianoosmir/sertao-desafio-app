import {Component} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../core/auth.service";
import {AlertService} from "../core/alert.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm: any;

  loginMessage: string | any;
  invalidLogin = false;
  loginSuccess = false;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private alertService: AlertService,
              private activatedRoute: ActivatedRoute,
              private authenticationService: AuthService) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      senha: ['', Validators.required],
    })
  }

  ngOnInit() {
    this.authenticationService.logout();
  }

  handleLogin() {
    if (this.loginForm?.valid) {
      const username = this.loginForm.controls['username'].value;
      const senha = this.loginForm.controls['senha'].value;

      this.authenticationService.login(username, senha).subscribe((result) => {
        if (result === 'USUARIO DESABILITADO' || result === 'CREDENCIAIS INVALIDAS' || result === 'USUARIO NÃO CADASTRADO') {
          this.invalidLogin = true;
          this.loginSuccess = false;
          this.loginMessage = result;
          this.alertService.showAlertDanger(this.loginMessage);
        } else {
          this.invalidLogin = false;
          this.loginSuccess = true;
          this.authenticationService.setToken(result);
          this.authenticationService.logged();
          this.loginMessage = 'Login Successful.';
          this.alertService.showAlertSuccess(this.loginMessage);
          this.router.navigate(['/produtos']);
        }
      })
    }
  }
}
