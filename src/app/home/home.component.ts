import { Component, OnInit, ViewChild } from '@angular/core';
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
import { PatientDialogComponent } from '../shared/patient-dialog/patient-dialog.component';

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
  // categories: CategoryClass[];
  selectedCategoryName: string;
  // productsSubscription!: Subscription;
  // categoriesSubscription!: Subscription;
  loading: boolean;

  constructor(
    private _patientService: PatientService,
    public dialog: MatDialog, private _toastr: ToastrService, private router: Router, private localStorageService: LocalStorageService
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
    this.selectedCategoryName = '';
    this.loading = true;
  }

  ngOnInit(): void {
    this.getAllPatients();
    // this.getAllCategories();
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
    this.dataSource = new MatTableDataSource(this._patientService.getAllPatients());
    console.log(this._patientService.getAllPatients())
    this.loading = false;
  }

  applyFilter(searched: string) {
    // this.dataSource.filter = searched.trim().toLowerCase();
    // if (searched != '') {
    //   this.dataSource.filterPredicate = function (
    //     data,
    //     searched: string
    //   ): boolean {
    //     return (
    //       data.id == searched ||
    //       data.category.name.toLowerCase().includes(searched)
    //     );
    //   };
    // }
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
    this.localStorageService.setItem('patientId', id++);
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
      'Do you want to delete the next patient?',
      `First Name: ${patient.firstName} \nLast Name: ${patient.firstName} \nOther Data: bla bla bla`,
      3
    );
  }

  openConfirmDialog(
    product: Patient,
    title: string,
    content: string,
    option: number
  ): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      disableClose: true, panelClass: 'custom-container-equals-border-radius',
      data: { title: title, content: content },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // switch (option) {
        //   case 1:
        //     this._patientService.addProduct(product).subscribe(
        //       (result) => {
        //         this.getAllProducts();
        //         this._toastr.success('Producto agregado con exito');
        //       },
        //       (error) => {
        //         console.log(error);
        //       }
        //     );
        //     break;
        //   case 2:
        //     this._patientService.updateProduct(product).subscribe(
        //       (result) => {
        //         this.getAllProducts();
        //         this._toastr.success('Producto modificado con exito');
        //       },
        //       (error) => {
        //         console.log(error);
        //       }
        //     );
        //     break;
        //   case 3:
        //     this._patientService.deleteProduct(product.id).subscribe(
        //       (result) => {
        //         this.getAllProducts();
        //         this._toastr.success('Producto eliminado con exito');
        //       },
        //       (error) => {
        //         console.log(error);
        //       }
        //     );
        //     break;
        // }
      }
    });
  }

  getAllCategories() {
    // this.categoriesSubscription = this._patientService
    //   .getCategoriesProducts()
    //   .subscribe(
    //     (response: any) => {
    //       this.categories = response;
    //     },
    //     (error) => {
    //       console.log(error);
    //     }
    //   );
  }

  goToHours() {
    this.router.navigate(['care-schedule']);
  }

  ngOnDestroy(): void {
    // this.productsSubscription.unsubscribe();
    // this.categoriesSubscription.unsubscribe();
  }
}
