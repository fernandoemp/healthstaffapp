import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AttentionHour } from '../core/classes/attetion-hour.class';
import { Patient } from '../core/classes/patient.class';
import { PatientService } from '../core/services/patient.service';
import { ManageArrayDialogComponent } from '../shared/manage-array-dialog/manage-array-dialog.component';
import { PatientDialogComponent } from '../shared/patient-dialog/patient-dialog.component';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss']
})
export class PatientComponent implements OnInit {

  selectedPatient = new Patient();
  test: any | undefined;
  myForm = this._fb.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    hospitalBed: ['',],
    hospitalRoom: ['',],
    address: ['',],
    familyContact: ['',],
    healthcareSystem: ['',],
    healthcareSystemId: ['',],
    hours: ['', ]


    // ospitalRoom: ['', ]
    // hours: ['', ]
    // stock: ['', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
    // categorySelected: ['', [Validators.required]],
    // description: ['', [Validators.required]]
  });


  constructor(private _patientService: PatientService, private _fb: FormBuilder, private matDialog: MatDialog) {

  }

  ngOnInit(): void {
  }

  onNoClick(): void {
    // this.dialogRef.close();
  }
  onClick(): void {
    // this.selectedPatient.category = this.category;
  }

  addHours(attentionHours: AttentionHour[]){
    console.log(attentionHours);
    let attentionHour = new AttentionHour();
    const dialogRef = this.matDialog.open(ManageArrayDialogComponent, {
      disableClose: true, panelClass: 'custom-container-equals-border-radius',
      data: { title: 'Attention Hours', array: attentionHours, update: false },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('result');
      console.log(result);
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

  ngOnDestroy(): void {
    // this.categoriesSubscription?.unsubscribe();
  }
}