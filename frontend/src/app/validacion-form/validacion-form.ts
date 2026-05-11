import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

import { CatalogService } from '../../../services/catalog.service';

@Component({
  selector: 'app-catalogs-create',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './catalogs-create.component.html',
  styleUrl: './catalogs-create.component.css'
})
export class CatalogsCreateComponent {

  @Input() defaultType: string = '';
  @Output() onSubmit = new EventEmitter<any>();

  title = '';
  type = '';

  isSaving = false;

  // NUEVO
  existsMessage = '';
  titleExists = false;

  constructor(
    private catalogService: CatalogService
  ) {}

  ngOnInit() {
    this.type = this.defaultType;
  }

  // NUEVO
  onTitleChange() {
    this.existsMessage = '';
    this.titleExists = false;

    if (!this.title || this.title.trim().length < 2) {
      return;
    }

    const cleanTitle = this.normalizeText(this.title);

    this.catalogService.getAll({}).subscribe({
      next: (response: any) => {

        const allCatalogs = [
          ...(response?.data?.areas || []),
          ...(response?.data?.uniforms || []),
          ...(response?.data?.models || []),
          ...(response?.data?.sizes || []),
          ...(response?.data?.colors || [])
        ];

        const found = allCatalogs.find((catalog: any) => {
          const existing = this.normalizeText(catalog.title);

          return (
            existing === cleanTitle ||
            existing.includes(cleanTitle) ||
            cleanTitle.includes(existing) ||
            this.similarity(existing, cleanTitle) >= 0.8
          );
        });

        if (found) {
          this.titleExists = true;
          this.existsMessage = `Ya existe algo parecido: "${found.title}"`;
        }

      },
      error: () => {}
    });
  }

  // NUEVO
  normalizeText(text: string): string {
    return text
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  }

  // NUEVO
  similarity(a: string, b: string): number {
    const longer = a.length > b.length ? a : b;
    const shorter = a.length > b.length ? b : a;

    const longerLength = longer.length;

    if (longerLength === 0) {
      return 1;
    }

    return (
      (longerLength - this.editDistance(longer, shorter)) /
      longerLength
    );
  }

  // NUEVO
  editDistance(a: string, b: string): number {
    const matrix = [];

    for (let i = 0; i <= b.length; i++) {
      matrix[i] = [i];
    }

    for (let j = 0; j <= a.length; j++) {
      matrix[0][j] = j;
    }

    for (let i = 1; i <= b.length; i++) {
      for (let j = 1; j <= a.length; j++) {

        if (b.charAt(i - 1) === a.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1
          );
        }

      }
    }

    return matrix[b.length][a.length];
  }

  submit() {

    // NUEVO
    if (this.titleExists) {
      Swal.fire({
        icon: 'warning',
        title: 'Nombre inválido',
        text: 'Ya existe un catálogo muy parecido',
        confirmButtonColor: '#198754'
      });

      return;
    }

    if (!this.title || !this.type) {
      Swal.fire({
        icon: 'warning',
        title: 'Campos requeridos',
        text: 'Debes llenar todos los campos',
        confirmButtonColor: '#198754'
      });

      return;
    }

    this.isSaving = true;

    const payload = {
      title: this.title,
      type: this.type
    };

    this.catalogService.store(payload).subscribe({
      next: (response: any) => {

        this.isSaving = false;

        Swal.fire({
          icon: 'success',
          title: 'Catálogo creado',
          text: 'Se creó correctamente',
          confirmButtonColor: '#198754'
        });

        this.onSubmit.emit({
          catalog: response.response,
          type: this.type
        });

        this.title = '';
      },
      error: () => {

        this.isSaving = false;

        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo crear el catálogo',
          confirmButtonColor: '#198754'
        });
      }
    });
  }
}