import { Injectable } from "@angular/core";
import { CanMatch, Route, Router, UrlSegment, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthGuard implements CanMatch {
  constructor(
    private auth: AuthService,
    private router: Router
  ) { }
  canMatch(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (this.auth.isAuthenticated()) {
      return true
    }
    this.auth.logout()
    this.router.navigate(['/admin', 'login'], {
      queryParams: {
        loginAgain: true
      }
    })
    return false
  }
}


