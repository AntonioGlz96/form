import { Routes } from '@angular/router';
import { Usuarios } from './usuarios/usuarios';
import { Login } from './login/login';

export const routes: Routes = [
    {path:'usuarios', component: Usuarios},
    {path:'login', component: Login}
];
