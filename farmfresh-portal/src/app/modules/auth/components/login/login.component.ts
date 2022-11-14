import { LoginResponse } from './../../models/login-response';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { FormValidationService } from 'src/app/modules/shared/utilities/form-validation';
import { AuthCacheService } from '../../services/auth-cache.service';
import { AuthService } from '../../services/auth.service';
import { loginInFormValidationMessages } from '../../utilities/validations/login-form-validation';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  signInForm: FormGroup = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required]),
  });

  signInFormErrors: any = {
    email: "",
    password: "",
  };
  
  errorStatus: string = '';
  rootUrl: string = window.location.origin;
  homeUrl: string = this.rootUrl + "/home/dashboard";
  permissionList: string[] =  [];
  accountVerified: boolean = true;
  loginEmail: string = "";
  submitted: boolean = false;

  tempUser: any = {
    email: "temp@gmail.com",
    password: "temp123"
  }

  constructor(
    private router: Router,
    private formValidator: FormValidationService,
    private authCacheService: AuthCacheService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.submitted = false;
  }

  validateLoginForm(fg: FormGroup = this.signInForm): void {
    Object.keys(fg.controls).forEach((key: string) => {
      const abstractControl = fg.get(key);
      if (abstractControl instanceof FormGroup) {
        this.validateLoginForm(abstractControl);
      } else {
        this.formValidator.validateForm(
          abstractControl!,
          key,
          this.signInFormErrors,
          loginInFormValidationMessages
        );
      }
    });
  }

  // Getter method to access formcontrols
  get loginForm() {
    return this.signInForm.controls;
  }

  resendVerificationEmail() {

  }

  login() {
    this.submitted = true;

    if (this.signInForm.valid) {
      let signInFormData = {
        email: this.signInForm.value["email"],
        password: this.signInForm.value["password"],
      };
      this.loginEmail = signInFormData.email;

      this.authService.authenticationUser(signInFormData).subscribe(
        (response : any) => {
          let data: LoginResponse = response;

          this.authCacheService.setToken(data.token);
          this.authCacheService.setUserEmail(data.email);
          this.authCacheService.setLoggedIn();
          
          this.router.navigate(['/']);
        },
        (error : any) => {
          this.authCacheService.clearLoggedIn();
          this.errorStatus = "Email or Password is wrong. Please try again !"; 
        }
      );
    }
  }
}