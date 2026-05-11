import { Component } from '@angular/core';

@Component({
  selector: 'app-modelo-talla',
  imports: [],
  templateUrl: './modelo-talla.html',
  styleUrl: './modelo-talla.css',
})



export class ModeloTalla {
  loadPantsModelsAndSizes() {

  this.modelCatalog
    .buscarPorPrenda('PANTS', this.projectId)
    .subscribe({

      next: (models: any[]) => {

        this.modelPants = models;

        // recorrer modelos encontrados
        models.forEach((model: any) => {

          // catalog_id del modelo
          const modelId = model.catalog_id;

          // buscar tallas de ese modelo
          this.modelCatalog
            .buscar2(modelId)
            .subscribe({

              next: (sizes: any[]) => {

                // guardar tallas dentro del modelo
                model.sizes = sizes;

                this.cdr.detectChanges();
              },

              error: () => {
                model.sizes = [];
              }

            });

        });

      },

      error: () => {
        this.modelPants = [];
      }

    });
}

}
