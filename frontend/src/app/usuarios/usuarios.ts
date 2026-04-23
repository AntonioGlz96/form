import { Component, inject, OnInit, signal } from '@angular/core';
import { UsuarioService } from '../servicios/usuarios';
import { RouterLink } from '@angular/router'; // Importante para el botón

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [RouterLink], // Agregamos esto para que funcione el botón del HTML
  templateUrl: './usuarios.html',
  styleUrl: './usuarios.css' // <--- Aquí vinculamos el CSS
})
export class Usuarios implements OnInit {
  private usuarioService = inject(UsuarioService);
  listaUsuarios = signal<any[]>([]);

  ngOnInit() {
    this.usuarioService.getUsuarios().subscribe({
      next: (datos: any) => this.listaUsuarios.set(datos),
      error: (err: any) => console.error('Error:', err)
    });
  }
}