import { Component } from '@angular/core';
import { AuthenticationService } from '../../services/services';
import { Router } from '@angular/router';
import { CodeInputModule } from 'angular-code-input';

@Component({
  selector: 'app-activate-account',
  imports: [CodeInputModule],
  templateUrl: './activate-account.html',
  styleUrl: './activate-account.scss'
})
export class ActivateAccount {

  message: string = '';
  isOkay: boolean = true;
  submitted: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthenticationService
  ){}

  onCodeComplete(token: string){
    this.comfirmAccount(token);
  }
  private comfirmAccount(token: string) {
    this.authService.confirm({
      token
    }).subscribe({
      next: () => {
        this.message = 'Your account has been successfully activated.\nNow you can proceed to login.';
        this.submitted = true;
        this.isOkay = true;
      },
      error: () => {
        this.message = "Token has been expired or invalid.";
        this.submitted = true;
        this.isOkay = false;
      }
    });
  }
  redirectToLogin(){
    this.router.navigate(['login']);
  }
}
