import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    if (!this.email || !this.password) {
      alert('Email and password are required');
      return;
    }
  
    // Verifica que la contraseña sea una cadena válida
    if (typeof this.password !== 'string') {
      alert('Invalid password format');
      return;
    }
  
    console.log('Sending registration request with:', { email: this.email, password: this.password }); // Depuración
  
    this.authService.register(this.email, this.password).subscribe({
      next: (res) => {
        console.log('Registration successful:', res); // Depuración
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Error during registration:', err);
        alert('Error al Registrar Usuario, Vuelve a Intentarlo Con otro correo');
      },
    });
  }
  
}