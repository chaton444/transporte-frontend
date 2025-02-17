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
  { path: 'home', component: HomeComponent },  
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Solo accesible con token
];