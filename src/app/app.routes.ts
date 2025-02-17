import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { authGuard } from './auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';

// El authGuard sirve para tener acceso a los componentes solo cuando tiene el token, por así decirlo.
export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent },  // Dashboard accesible sin login
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },  // Redirige al Dashboard por defecto
  { path: 'home', component: HomeComponent, canActivate: [authGuard] },  // Solo accesible con token
];
