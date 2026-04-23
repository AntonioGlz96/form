import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UsuarioService } from '../servicios/usuarios';
import { Router, RouterLink } from '@angular/router'; // Añadimos RouterLink

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink], // Importante añadir RouterLink aquí
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  private usuarioService = inject(UsuarioService);
  private router = inject(Router);

  usuario = {
    name: '',
    gmail: '',
    tel: ''
  };

  enviarDatos() {
    if (!this.usuario.name || !this.usuario.gmail) {
      alert('Por favor, llena los campos obligatorios.');
      return;
    }

    this.usuarioService.saveUsuario(this.usuario).subscribe({
      next: (res: any) => {
        this.router.navigate(['/usuarios']);
      },
      error: (err: any) => {
        console.error('Error al conectar con Laravel', err);
        alert('Hubo un error al guardar.');
      }
    });
  }
}