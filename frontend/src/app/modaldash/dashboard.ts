import { CommonModule } from "@angular/common";
import { ChangeDetectorRef, Component, ViewChild, inject, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterLink } from "@angular/router";
import { DataTableComponent } from "../../../shared/components/data-table/data-table.component";
import Catalog from "../../../models/Catalog.model";
import { CatalogService } from "../../../services/catalog.service";
import Swal from "sweetalert2";
import { ModalComponent } from "../../../shared/components/modal/modal.component";
import { CreateComponent } from "../create/create.component";
import { CorporationService } from "../../../services/corporation.service";
import { ModelCatalogsServices } from "../../../services/model-catalogs.service";

@Component({
  selector: "app-dashboard",
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    DataTableComponent,
    ModalComponent,
    CreateComponent,
  ],
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent {

  @ViewChild("appCatalogForm") appCatalogForm!: ModalComponent;
  @ViewChild("appRelationForm") appRelationForm!: ModalComponent;

  private modelCatalogsService = inject(ModelCatalogsServices);

  relacionesRaw = signal<any[]>([]);

  selectedModelForRelation: any = null;

  public tableDataModels: Array<Catalog> = [];
  public tableDataColors: Array<Catalog> = [];
  public tableDataSizes: Array<Catalog> = [];

  constructor(
    private catalogService: CatalogService,
    private corporationService: CorporationService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.loadCatalogs();
    this.loadModelCatalogs();
  }

  private loadCatalogs() {
    this.catalogService.getAll({with_related_projects: true}).subscribe({
      next: (response) => {
        this.tableDataModels = response.data.models;
        this.tableDataColors = response.data.colors;
        this.tableDataSizes  = response.data.sizes;
        this.cdr.detectChanges();
      }
    });
  }

  private loadModelCatalogs() {
    this.modelCatalogsService.get_modelCatalogs().subscribe({
      next: (res: any) => {
        this.relacionesRaw.set(res || []);
      }
    });
  }

  openRelationModal(model: any) {
    this.selectedModelForRelation = model;
    this.appRelationForm.open({ size: 'lg' });
  }

  get relacionesDelModelo() {
    return this.relacionesRaw().filter(r =>
      r.model_id === this.selectedModelForRelation?.id
    );
  }
}