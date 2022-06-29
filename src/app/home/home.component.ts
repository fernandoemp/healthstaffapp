import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Patient } from '../core/classes/patient.class';
import { LocalStorageService } from '../core/services/local-storage.service';
import { PatientService } from '../core/services/patient.service';
import { ConfirmDialogComponent } from '../shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  displayedColumns: string[];
  dataSource!: MatTableDataSource<Patient>;
  // productsSubscription!: Subscription;
  // categoriesSubscription!: Subscription;
  loading: boolean;

  constructor(
    private _patientService: PatientService,
    public dialog: MatDialog, private _toastr: ToastrService, private router: Router, private localStorageService: LocalStorageService, private cdr: ChangeDetectorRef
  ) {
    this.displayedColumns = [
      // "id",

      "hospitalRoom",
      "hospitalBed",
      "identityCardNumber",
      "lastName",
      "firstName",

      // 'stock',
      // 'category',
      // 'description',
      'actions',
    ];
    // this.categories = [];
    this.loading = true;

  }

  ngOnInit(): void {
    this.getAllPatients();

  }

  getAllPatients() {
    // this.productsSubscription = this._patientService.getAllProducts().subscribe(
    //   (response: any) => {
    //     // console.log(JSON.stringify(response));
    //     this.dataSource = new MatTableDataSource(response);
    //     this.dataSource.paginator = this.paginator;
    //     this.dataSource.sort = this.sort;
    //     this.loading = false;
    //   },
    //   (error) => {
    //     console.log(error);
    //   }
    // );
    // console.log(JSON.stringify(this._patientService.getAllPatients()));
    this.dataSource = new MatTableDataSource<Patient>(this._patientService.getAllPatients());
    this.cdr.detectChanges();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.loading = false;
  }

  applyFilter(searched: any) {
    searched.toLowerCase();
    this.dataSource.filter = searched.trim().toLowerCase();
    if (searched != '') {
      this.dataSource.filterPredicate = function (
        data,
        searched: string
      ): boolean {
        return (
          data.identityCardNumber?.includes(searched) ||
          data.hospitalRoom == searched || (!!data.lastName ? data.lastName.toLocaleLowerCase().includes(searched) : false)
        );
      };
    }
  }

  add() {
    // const dialogRef = this.dialog.open(PatientDialogComponent, {
    //   disableClose: true, panelClass: 'custom-container-equals-border-radius',
    //   data: { title: 'Add Patient', product: product, update: false },
    // });
    // dialogRef.afterClosed().subscribe((result) => {
    //   // if (result !== undefined) {
    //   //   this.categories.forEach((element) => {
    //   //     if (element.id == result.product.category.id) {
    //   //       result.product.category.name = element.name;
    //   //     }
    //   //   });
    //   //   Object.assign(product, result.product);
    //   //   this.openConfirmDialog(
    //   //     result.product,
    //   //     'Agregar el siguiente producto?',
    //   //     `Nombre: ${result.product.name} \nCategoria:  ${(result.product.category?.name).toUpperCase() } \nPrecio: $${result.product.price} \nStock: ${result.product.stock} \nDescripcion: ${result.product.description}`,
    //   //     1
    //   //   );
    //   // }
    // });
    let patient = new Patient();

    let id = this.localStorageService.getItem("patientId");
    patient.id = id;
    id++;
    this.localStorageService.setItem('patientId', id);
    this.localStorageService.setItem('selectedPatient', patient);
    this.router.navigate(['patient']);
  }

  update(patient: Patient) {
    // const dialogRef = this.dialog.open(PatientDialogComponent, {
    //   disableClose: true, panelClass: 'custom-container-equals-border-radius',
    //   data: { title: 'Modify Patient', patient: patient, update: true },
    // });
    // dialogRef.afterClosed().subscribe((result) => {
    //   if (result !== undefined) {
    //     this.openConfirmDialog(
    //       result.patient,
    //       'Do you want to modify the next patient?',
    //       `Id: ${result.product.id} \nName: ${result.patient.name} \nCategoria: ${result.product.category?.name} \nPrecio: $${result.product.price} \nStock: ${result.product.stock} \nDescripcion: ${result.product.description}`,
    //       2
    //     );
    //   }
    // });
    this.localStorageService.setItem('selectedPatient', patient);
    this.router.navigate(['patient']);
  }

  delete(patient: Patient) {
    this.openConfirmDialog(
      patient,
      'Delete the next patient?',
      `ID Card Number: ${patient.identityCardNumber} \nName: ${patient.firstName} \nLastname: ${patient.lastName}`,
      3
    );
  }

  openConfirmDialog(
    patient: Patient,
    title: string,
    content: string,
    option: number
  ): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      panelClass: 'custom-container-equals-border-radius', minWidth: '90vw',
      data: { title: title, content: content },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        switch (option) {
          case 1:
            // this._productService.addProduct(product).subscribe(
            //   (result) => {
            //     this.getAllProducts();
            this._toastr.info('Producto agregado con exito');
            //   },
            //   (error) => {
            //     console.log(error);
            //   }
            // );
            break;
          case 2:
            // this._productService.updateProduct(product).subscribe(
            //   (result) => {
            //     this.getAllProducts();
            this._toastr.info('Producto modificado con exito');
            //   },
            //   (error) => {
            //     console.log(error);
            //   }
            // );
            break;
          case 3:
            let patients = this._patientService.getAllPatients();
            let index = patients.findIndex(x => x.id == patient.id);
            if (index != -1) {
              patients.splice(index, 1);
              this._toastr.info('Patient removed successfully');
              this._patientService.updatePatients(patients);
              this.getAllPatients();
            }
            else {
              this._toastr.info('Patient no not found');
            }
            break;
        }
      }
    });
  }

  goToHours() {
    this.router.navigate(['care-schedule']);
  }

  ngOnDestroy(): void {
    // this.productsSubscription.unsubscribe();
    // this.categoriesSubscription.unsubscribe();
  }
}
