import {signal} from '@angular/core';

export interface Authenciation {
  username: string;
  password: string;
}

export const loginModel = signal<Authenciation>({
  username: '',
  password: '',
});

export const registerModel = signal<Authenciation>({
  username: '',
  password: '',
});
