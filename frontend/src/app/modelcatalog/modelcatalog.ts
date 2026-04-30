import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// import { RelacionesService } from  el de servicios de catalogmodel






@Component({
  selector: 'app-modelcatalog',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './modelcatalog.html',
  styleUrl: './modelcatalog.css',
})
export class ModelRelationCreateComponent {

  @Input() models: any[] = [];
  @Input() colors: any[] = [];
  @Input() sizes: any[] = [];
  @Input() relacionesExistentes: any[] = [];

  selectedModel: number | null = null;
  selectedCategories: number[] = [];

  constructor(private service: RelacionesService) {}

  toggleCategory(id: number) {
    if (this.selectedCategories.includes(id)) {
      this.selectedCategories = this.selectedCategories.filter(x => x !== id);
    } else {
      this.selectedCategories.push(id);
    }
  }

  existeRelacion(modelId: number, catalogId: number): boolean {
    return this.relacionesExistentes.some(r =>
      r.model_id === modelId && r.catalog_id === catalogId
    );
  }

  submit() {
    if (!this.selectedModel) {
      alert('Selecciona un modelo');
      return;
    }

    if (this.selectedCategories.length === 0) {
      alert('Selecciona al menos una categoría');
      return;
    }

    const nuevos = this.selectedCategories
      .filter(catId => !this.existeRelacion(this.selectedModel!, catId))
      .map(catId => ({
        model_id: this.selectedModel,
        catalog_id: catId
      }));

    if (nuevos.length === 0) {
      alert('Todas las relaciones ya existen');
      return;
    }

    // Insertar nuevas relaciones
    nuevos.forEach(rel => {
      this.service.insertRelacion(rel).subscribe({
        next: () => console.log('Insertado', rel),
        error: () => console.error('Error', rel)
      });
    });

    alert('Relaciones guardadas');
    this.selectedCategories = [];
  }
}