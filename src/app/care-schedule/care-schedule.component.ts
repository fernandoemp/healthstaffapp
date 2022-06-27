import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Patient } from '../core/classes/patient.class';
import { PatientService } from '../core/services/patient.service';
import { ConfirmDialogComponent } from '../shared/confirm-dialog/confirm-dialog.component';
import { ManageArrayDialogComponent } from '../shared/manage-array-dialog/manage-array-dialog.component';
import { PatientDialogComponent } from '../shared/patient-dialog/patient-dialog.component';

@Component({
  selector: 'app-care-schedule',
  templateUrl: './care-schedule.component.html',
  styleUrls: ['./care-schedule.component.scss']
})
export class CareScheduleComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  displayedColumns: string[];
  dataSource!: MatTableDataSource<Patient>;
  // categories: CategoryClass[];
  selectedCategoryName: string;
  // productsSubscription!: Subscription;
  // categoriesSubscription!: Subscription;
  loading: boolean;
  test: any;
  myForm = this._fb.group({
    hospitalBed: ['',],
    hospitalRoom: ['',],
    check: ['',]
    // stock: ['', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
    // categorySelected: ['', [Validators.required]],
    // description: ['', [Validators.required]]
  });

  constructor(
    private patientService: PatientService,
    public matDialog: MatDialog, private _toastr: ToastrService, private _fb: FormBuilder
  ) {
    this.displayedColumns = [
      // "id",
      // "firstName",
      "hospitalRoom",
      "hospitalBed",
      "lastName",
      "attetionHour",



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
    this.dataSource = new MatTableDataSource(this.patientService.getAllPatients());
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

  addProduct() {
    let product = new Patient();
    const dialogRef = this.matDialog.open(PatientDialogComponent, {
      disableClose: true, panelClass: 'custom-container-equals-border-radius',
      data: { title: 'Add Hour', product: product, update: false },
    });
    dialogRef.afterClosed().subscribe((result) => {
      // if (result !== undefined) {
      //   this.categories.forEach((element) => {
      //     if (element.id == result.product.category.id) {
      //       result.product.category.name = element.name;
      //     }
      //   });
      //   Object.assign(product, result.product);
      //   this.openConfirmDialog(
      //     result.product,
      //     'Agregar el siguiente producto?',
      //     `Nombre: ${result.product.name} \nCategoria:  ${(result.product.category?.name).toUpperCase() } \nPrecio: $${result.product.price} \nStock: ${result.product.stock} \nDescripcion: ${result.product.description}`,
      //     1
      //   );
      // }
    });
  }

  update(patient: Patient) {
    const dialogRef = this.matDialog.open(ManageArrayDialogComponent, {
      disableClose: true, panelClass: 'custom-container-equals-border-radius',
      data: { title: 'Attention Hours', array: patient.attentionHours, update: false, hasElements: !!patient.attentionHours.length ? true : false },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result != undefined) {
        let patients = this.patientService.getAllPatients();
        let index = patients.findIndex(x => x.id == patient.id);
        console.log(index)
        patient.attentionHours = result;
        if (index != -1) {
          patients.splice(index, 1, patient);
          console.log(patients)
          this.patientService.updatePatients(patients);
        }
        this.getAllPatients();
      }
    });

  }

  delete(patient: Patient) {
    this.openConfirmDialog(
      patient,
      'Do you want to delete the next hour?',
      `Comming soon`,
      3
    );
  }

  openConfirmDialog(
    product: Patient,
    title: string,
    content: string,
    option: number
  ): void {
    const dialogRef = this.matDialog.open(ConfirmDialogComponent, {
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
}
