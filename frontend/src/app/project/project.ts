import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ProjectsService } from '../../../services/projects.service';
import { SpinnerComponent } from '../../../shared/components/spinner/spinner.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { UsersService } from '../../../services/users.service';
import { ModalComponent } from '../../../shared/components/modal/modal.component';
import { CreateComponent as CreateCatalogComponent } from '../../catalogs/create/create.component';
import Catalog from '../../../models/Catalog.model';
import { CatalogService } from '../../../services/catalog.service';
import { CorporationService } from '../../../services/corporation.service';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    SpinnerComponent,
    NgSelectModule,
    NgbTooltipModule,
    ModalComponent,
    CreateCatalogComponent
  ],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent {

  @ViewChild("appCatalogForm") appCatalogForm!: ModalComponent;

  defaultType: string = '';

  project = {
    no_project: '',
    name_project: '',
    check_pants: false,
    check_shirt: false,
    check_jacket: false,
    check_belt: false,
    check_boots: false,
    check_cap: false,
    corporation_id: '',
    status: 1,
    is_finished: 0
  };

  catalogs = {
    uniforms: { data: [] as Catalog[], is_loading: true },
    areas: { data: [] as Catalog[], is_loading: true },
    models: { data: [] as Catalog[], is_loading: true }
  };

  projectUniforms: number[] = [];
  projectAreas: number[] = [];

  // 🔥 MODELOS POR PRENDA
  projectModels = {
    pants: [] as number[],
    shirt: [] as number[],
    jacket: [] as number[],
    belt: [] as number[],
    boots: [] as number[],
    cap: [] as number[],
  };

  isLoading = false;
  isSaving = false;

  users: any[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private projectsService: ProjectsService,
    private userService: UsersService,
    private catalogService: CatalogService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadCatalogs();
  }

  loadCatalogs() {
    this.catalogService.getAll({}).subscribe({
      next: (res) => {
        this.catalogs.uniforms.data = res.data.uniforms;
        this.catalogs.areas.data = res.data.areas;
        this.catalogs.models.data = res.data.models;

        this.catalogs.uniforms.is_loading = false;
        this.catalogs.areas.is_loading = false;
        this.catalogs.models.is_loading = false;

        this.cdr.detectChanges();
      }
    });
  }

  GuardarProyecto() {

    if (!this.project.no_project || !this.project.name_project) {
      Swal.fire('Error', 'Campos obligatorios', 'warning');
      return;
    }

    const payload = {
      ...this.project,
      users: this.users,
      areas: this.projectAreas,
      uniforms: this.projectUniforms,
      models_by_garment: this.projectModels
    };

    this.projectsService.storeOrUpdate(payload).subscribe({
      next: () => {
        Swal.fire('Éxito', 'Proyecto guardado', 'success');
        this.router.navigate(['/app/projects/dashboard']);
      },
      error: () => {
        Swal.fire('Error', 'No se pudo guardar', 'error');
      }
    });
  }

  openCreateCatalogModal(type: string) {
    this.defaultType = type;
    this.appCatalogForm.open({ size: 'xl' });
  }

  onCatalogCreated({ catalog, type }: any) {
    if (type === 'UNIFORM') {
      this.catalogs.uniforms.data.push(catalog);
    } else if (type === 'AREA') {
      this.catalogs.areas.data.push(catalog);
    }
  }
}