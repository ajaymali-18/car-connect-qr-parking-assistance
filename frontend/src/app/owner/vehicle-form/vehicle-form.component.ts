import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { VehicleService } from '../../core/services/vehicle.service';
import { ToastService } from '../../core/services/toast.service';
import { Vehicle } from '../../shared/models/vehicle.model';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { BottomNavComponent } from '../../shared/components/bottom-nav/bottom-nav.component';

@Component({
  selector: 'app-vehicle-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, NavbarComponent, BottomNavComponent],
  templateUrl: './vehicle-form.component.html'
})
export class VehicleFormComponent implements OnInit {
  private fb: FormBuilder = inject(FormBuilder);
  private vehicleService: VehicleService = inject(VehicleService);
  private router: Router = inject(Router);
  private route: ActivatedRoute = inject(ActivatedRoute);
  private toastService: ToastService = inject(ToastService);

  isEditMode = false;
  vehicleId?: number;
  isLoading = false;
  showSuccessModal = false;
  createdVehicleId?: number;

  brandPresets = ['Honda', 'Toyota', 'Tesla', 'Hyundai', 'BMW', 'Tata', 'Mahindra'];
  colorPresets = [
    { name: 'Deep Navy Blue', hex: '#1E2749' },
    { name: 'Polar White', hex: '#F3F2FF' },
    { name: 'Crimson Red', hex: '#AE3026' },
    { name: 'Obsidian Black', hex: '#171B2B' },
    { name: 'Granite Grey', hex: '#76767F' }
  ];

  vehicleForm: FormGroup = this.fb.group({
    vehicleNumber: ['MH 12 AB 9999', [Validators.required, Validators.pattern(/^[A-Z0-9\s]{4,15}$/i)]],
    brand: ['Honda', [Validators.required]],
    model: ['City ZX', [Validators.required]],
    color: ['Deep Navy Blue', [Validators.required]],
    maskPhoneNumber: [true]
  });

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.isEditMode = true;
      this.vehicleId = Number(idParam);
      this.vehicleService.getVehicleById(this.vehicleId).subscribe((vehicle: Vehicle | undefined) => {
        if (vehicle) {
          this.vehicleForm.patchValue({
            vehicleNumber: vehicle.vehicleNumber,
            brand: vehicle.brand,
            model: vehicle.model,
            color: vehicle.color,
            maskPhoneNumber: vehicle.maskPhoneNumber !== undefined ? vehicle.maskPhoneNumber : true
          });
        }
      });
    }
  }

  selectBrand(brand: string): void {
    this.vehicleForm.patchValue({ brand });
  }

  selectColor(colorName: string): void {
    this.vehicleForm.patchValue({ color: colorName });
  }

  toggleMaskPhone(): void {
    const current = this.vehicleForm.get('maskPhoneNumber')?.value;
    this.vehicleForm.patchValue({ maskPhoneNumber: !current });
  }

  onSubmit(): void {
    if (this.vehicleForm.invalid) {
      this.vehicleForm.markAllAsTouched();
      this.toastService.warning('Please enter valid vehicle details');
      return;
    }

    this.isLoading = true;
    const formVal = this.vehicleForm.value;

    this.vehicleService.addVehicle(formVal).subscribe({
      next: (created: Vehicle) => {
        this.isLoading = false;
        this.createdVehicleId = created.id;
        this.showSuccessModal = true;
        setTimeout(() => {
          this.router.navigate(['/vehicles', created.id, 'qr']);
        }, 1500);
      },
      error: () => {
        this.isLoading = false;
        this.toastService.error('Could not register vehicle. Please try again.');
      }
    });
  }
}
