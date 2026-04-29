import { Component, inject, OnInit, signal, ViewEncapsulation } from '@angular/core';
import { UsuarioService } from '../servicios/usuarios';
import { RelacionesService }  from '../servicios/RelacionesService';//////////////////////////////////
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './usuarios.html',
  styleUrl: './usuarios.css',
  encapsulation: ViewEncapsulation.None
})
export class Usuarios implements OnInit {

  // 🔹 SERVICES
  private usuarioService = inject(UsuarioService);
  private relacionesService = inject(RelacionesService);

  // 🔹 USUARIOS
  listaUsuarios = signal<any[]>([]);
  usuarioSeleccionado = signal<any>(null);
  mostrarModal = signal(false);

  // 🔹 RELACIONES
  relacionesRaw = signal<any[]>([]);
  modelosAgrupados = signal<any[]>([]);

  // ===============================
  // INIT
  // ===============================
  ngOnInit() {
    this.cargarUsuarios();
    this.cargarRelaciones();
  }

  // ===============================
  // USUARIOS
  // ===============================
  cargarUsuarios() {
    this.usuarioService.getUsuarios().subscribe(datos => this.listaUsuarios.set(datos));
  }

  abrirModal(u: any) {
    this.usuarioSeleccionado.set({ ...u });
    this.mostrarModal.set(true);
  }

  cerrarModal() {
    this.mostrarModal.set(false);
    this.usuarioSeleccionado.set(null);
  }

  guardarCambios() {
    const user = this.usuarioSeleccionado();

    this.usuarioService.updateUsuario(user.id, user).subscribe({
      next: () => {
        this.cargarUsuarios();
        this.cerrarModal();
        alert('Usuario actualizado con éxito');
      },
      error: () => alert('Error al actualizar')
    });
  }

  buscarPorId(id: string) {
    if (!id) return this.cargarUsuarios();

    this.usuarioService.getUsuario(id).subscribe({
      next: (u) => this.listaUsuarios.set([u]),
      error: () => alert('No se encontró el usuario')
    });
  }

  eliminarUsuario(id: number) {
    if (confirm('¿Deseas eliminar este registro?')) {
      this.usuarioService.deleteUsuario(id).subscribe(() => this.cargarUsuarios());
    }
  }

  buscarEmail(email: string) {
    if (!email) return this.cargarUsuarios();

    this.usuarioService.buscarPorEmail(email).subscribe({
      next: (datos) => {
        if (datos.length === 0) alert('No se encontraron correos');
        this.listaUsuarios.set(datos);
      },
      error: () => alert('Error en la búsqueda')
    });
  }

  // ===============================
  // RELACIONES
  // ===============================
  cargarRelaciones() {
    this.relacionesService.getRelaciones().subscribe({
      next: (res: any) => {
        console.log('RELACIONES:', res);

        this.relacionesRaw.set(res || []);
        // this.relacionesRaw.set(res.data);

        this.procesarRelaciones();
      },
      error: () => alert('Error cargando relaciones')
    });
  }

  procesarRelaciones() {
    const mapa = new Map();

    this.relacionesRaw().forEach(item => {
      if (!mapa.has(item.idmodelo)) {
        mapa.set(item.idmodelo, {
          idmodelo: item.idmodelo,
          colores: [],
          tallas: []
        });
      }

      const modelo = mapa.get(item.idmodelo);

      if (item.catalog?.type === 'color') {
        modelo.colores.push(item.catalog.title);
      }

      if (item.catalog?.type === 'talla') {
        modelo.tallas.push(item.catalog.title);
      }
    });

    this.modelosAgrupados.set(Array.from(mapa.values()));
  }

}