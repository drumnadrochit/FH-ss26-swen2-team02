import { Routes } from '@angular/router';
import {Login} from './views/login/login';
import {Register} from './views/register/register';
import {Tours} from './views/tours/tours';

export const routes: Routes = [
  {path: '', component: Login},
  {
    path: 'login',
    component: Login,
  },
  {
    path: 'register',
    component: Register,
  },
  {
    path: 'tours',
    component: Tours,
  }
];
