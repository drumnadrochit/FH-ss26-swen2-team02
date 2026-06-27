import {Component, inject} from '@angular/core';
import {form, FormField, FormRoot, minLength, required} from '@angular/forms/signals';
import {Router} from '@angular/router';
import {InputButton} from '../../components/input-button/input-button';
import {InputField} from '../../components/input-field/input-field';
import {TourService} from '../../services/tour.service';
import {registerModel} from '../../interfaces/authentication-model';
import {CardType, InfoCard} from '../../components/info-card/info-card';

@Component({
  selector: 'app-register',
  imports: [
    InputButton,
    InputField,
    FormField,
    FormRoot,
    InfoCard
  ],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  private tourService = inject(TourService);
  private router = inject(Router);

  registerForm = form(registerModel, (sp) => {
    required(sp.username, {message: "Username is required"});
    required(sp.password, {message: "Password is required"});
    minLength(sp.password, 4, {message: "Password must be at least 4 characters"});
  }, {
    submission: {
      action: async (field) => {
        const data = field().value();

        const success = await this.tourService.register(data);

        if(success){
          await this.router.navigate(['\login']);
          return;
        }
        return {kind: 'serverError', message: 'Username or password is incorrect. Please try again.'};
      }
    }
  });

  isValid()
  {
    return  this.registerForm.username().valid()  && this.registerForm.password().valid();
  }

}
