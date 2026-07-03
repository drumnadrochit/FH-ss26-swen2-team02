import {ResolveFn, Routes} from '@angular/router';
import {Login} from './views/login/login';
import {Register} from './views/register/register';
import {Tours} from './views/tours/tours';
import {TourCRUD} from './views/tour-crud/tour-crud';
import {TourModel, TourType} from './models/tour.model';
import {inject} from '@angular/core';
import {LogsCRUD} from './views/logs-crud/logs-crud';

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
  },

  {
    path: 'tours/create',
    component: TourCRUD,
  },
  {
    path: 'tours/edit/:id',
    component: TourCRUD,
  },
  {
    path: 'tours/:tourId/logs/create',
    component: LogsCRUD,
  },
  {
    path: 'tours/:tourId/logs/:id',
    component: LogsCRUD,
    data: {editMode: true}
  }
];

