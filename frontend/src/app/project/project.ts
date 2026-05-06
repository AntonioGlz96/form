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

  @ViewChild("appCatalogForm", { static: false })
  appCatalogForm!: ModalComponent;

  defaultType: string = '';

  project = {
    no_project: '',
    name_project: '',

    // YA EXISTÍAN (solo se reutilizan)
    check_pants: false,
    check_shirt: false,
    check_jacket: false,
    check_belt: false,
    check_boots: false,
    check_cap: false,

    corporation_id: '',
    status: 1,
    is_finished: 0,
    is_finished_og: 0,
  };

  // NUEVO: estructura para manejar modelos por prenda
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
  projectId: any = null;

  users: any[] = [
    {
      id: null,
      name: '',
      username: '',
      password: this.generateRandomPassword(),
      role: null,
      email: '',
    }
  ];

  showPassword: boolean[] = [false];

  roles = [
    { id: 3, name: 'ADMIN. PROYECTO' },
    { id: 4, name: 'USUARIO' }
  ];

  userLog: any = null;

  catalogs: {
    uniforms: { data: Array<Catalog>, is_loading: boolean },
    areas: { data: Array<Catalog>, is_loading: boolean },
    models: { data: Array<Catalog>, is_loading: boolean }, // NUEVO
  } = {
    uniforms: { data: [], is_loading: true },
    areas: { data: [], is_loading: true },
    models: { data: [], is_loading: true }, // NUEVO
  }

  projectUniforms: number[] = [];
  projectAreas: number[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private projectsService: ProjectsService,
    private UserService: UsersService,
    private corporationService: CorporationService,
    private cdr: ChangeDetectorRef,
    private catalogService: CatalogService
  ) {}

  ngOnInit() {
    this.loadCatalogs();
  }

  loadCatalogs() {
    this.catalogService.getAll({}).subscribe({
      next: (response) => {
        this.catalogs.uniforms.data = response.data.uniforms;
        this.catalogs.areas.data = response.data.areas;

        // NUEVO: cargar modelos
        this.catalogs.models.data = response.data.models;

        this.catalogs.uniforms.is_loading = false;
        this.catalogs.areas.is_loading = false;

        // NUEVO
        this.catalogs.models.is_loading = false;

        this.cdr.detectChanges();
      }
    });
  }

  GuardarProyecto() {

    const payload = {
      ...this.project,
      users: this.users,
      uniforms: this.projectUniforms,
      areas: this.projectAreas,

      // NUEVO: enviar modelos por prenda
      models_by_garment: this.projectModels
    };

    console.log(payload);

    this.projectsService.storeOrUpdate(payload).subscribe({
      next: () => {
        Swal.fire('Guardado', 'Proyecto guardado correctamente', 'success');
        this.router.navigate(['/app/projects/dashboard']);
      },
      error: (err) => {
        console.error(err);
        Swal.fire('Error', 'Error al guardar', 'error');
      }
    });
  }

  generateRandomPassword(length: number = 8): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }
}