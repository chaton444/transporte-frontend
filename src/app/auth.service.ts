import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private router: Router) {}
  register(email: string, password: string) {
    const user = { email, password };
    console.log('Sending user data to backend:', user); // Depuración
    return this.http.post('http://3.145.34.206:3000/auth/register', user);
  }

//servicio para la autentificacion del back
  login(email: string, password: string) {
    return this.http.post('http://3.145.34.206:3000/auth/login', { email, password }).subscribe({
      next: (res: any) => {
        localStorage.setItem('access_token', res.access_token);
        this.loggedIn.next(true);
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.error('Error during login:', err);
        alert('Error al iniciar sesion,Vuelve a intentarlo');
      },
    });
  }

  logout() {
    localStorage.removeItem('access_token');
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('access_token'); // Devuelve true si hay un token
  }
}