import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModelCatalogsServices } from '../../../services/model-catalogs.service';

@Component({
  selector: 'app-modelcatalog',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './modelcatalog.component.html',
  styleUrl: './modelcatalog.component.css',
})
export class ModelcatalogComponent {

  @Input() model: any;
  @Input() colors: any[] = [];
  @Input() sizes: any[] = [];
  @Input() relacionesExistentes: any[] = [];

  selectedCategories: number[] = [];

  constructor(private service: ModelCatalogsServices) {}

  toggleCategory(id: number) {
    if (this.selectedCategories.includes(id)) {
      this.selectedCategories = this.selectedCategories.filter(x => x !== id);
    } else {
      this.selectedCategories.push(id);
    }
  }

  existeRelacion(model_id: number, catalog_id: number): boolean {
    return this.relacionesExistentes.some(r =>
      r.model_id === model_id && r.catalog_id === catalog_id
    );
  }

  submit() {
    if (!this.model) {
      alert('Modelo inválido');
      return;
    }

    if (this.selectedCategories.length === 0) {
      alert('Selecciona al menos una categoría');
      return;
    }

    const nuevos = this.selectedCategories
      .filter(catId => !this.existeRelacion(this.model.id, catId))
      .map(catId => ({
        model_id: this.model.id,
        catalog_id: catId
      }));

    if (nuevos.length === 0) {
      alert('Todas las relaciones ya existen');
      return;
    }

    nuevos.forEach(rel => {
      this.service.addModelCatalog(rel).subscribe();
    });

    alert('Relaciones guardadas');
    this.selectedCategories = [];
  }
}