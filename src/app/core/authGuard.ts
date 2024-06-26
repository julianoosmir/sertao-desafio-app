import {ActivatedRouteSnapshot, Router} from "@angular/router";
import {Observable} from "rxjs";
import {inject} from "@angular/core";
import {AuthService} from "./auth.service";
import {AlertService} from "./alert.service";

export const canActivate = (next: ActivatedRouteSnapshot):  Observable<boolean> | Promise<boolean> | boolean => {

  const authService = inject(AuthService);
  const route = inject(Router);
  const alert = inject(AlertService)

  const roles = next.data['role'] as string[];
  const role_user = authService.getRole();

  const validateRole = roles.some(el => role_user.includes(el))

  if (validateRole) {
    return true
  } else {
    alert.showAlertDanger('Você não tem acesso');
    route.navigateByUrl("/");
    return false;
  }

}
