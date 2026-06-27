import {Component, inject, signal} from '@angular/core';
import {form, FormField, FormRoot, minLength, required} from '@angular/forms/signals';
import {Router} from '@angular/router';
import {InputField} from '../../components/input-field/input-field';
import {InputButton} from '../../components/input-button/input-button';
import {TourService} from '../../services/tour.service';
import {loginModel} from '../../interfaces/authentication-model';
import {InfoCard} from '../../components/info-card/info-card';


@Component({
  selector: 'app-login',
  imports: [
    FormField,
    InputField,
    InputButton,
    FormRoot,
    InfoCard
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private tourService = inject(TourService);
  private router = inject(Router);

    loginForm = form(loginModel, (sp) => {
      required(sp.username, {message: "Username is required"});
      required(sp.password, {message: "Password is required"});
      minLength(sp.password, 4, {message: "Password must be at least 4 characters"});
    }, {
      submission: {
        action: async (field) => {
          const data = field().value();

          const success = await this.tourService.login(data);

          if(success){
           await this.router.navigate(['/tours'])
           return
          }

          return {kind: 'serverError', message: 'Username or password is incorrect. Please try again.'};
        }
      }
    });

    isValid()
    {
      return  this.loginForm.username().valid()  && this.loginForm.password().valid();
    }



}
