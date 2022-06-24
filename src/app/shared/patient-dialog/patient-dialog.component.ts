import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Patient } from 'src/app/core/classes/patient.class';
import { PatientService } from 'src/app/core/services/patient.service';

@Component({
  selector: 'app-patient-dialog',
  templateUrl: './patient-dialog.component.html',
  styleUrls: ['./patient-dialog.component.scss']
})
export class PatientDialogComponent implements OnInit {
  // category: CategoryClass = new CategoryClass();
  // categories: CategoryClass[] = [];
  // categoriesSubscription?: Subscription;
  selectedPatient = new Patient();
  test: any | undefined;
  myForm = this._fb.group({
    firstName : ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    hospitalBed: ['', ],
    hospitalRoom: ['', ],
    hours: ['', ]
    // stock: ['', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
    // categorySelected: ['', [Validators.required]],
    // description: ['', [Validators.required]]
  });


  constructor(private _patientService: PatientService, private _fb: FormBuilder, public dialogRef: MatDialogRef<PatientDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      Object.assign(this.selectedPatient, data.patient);
      // Object.assign(this.category, data.product.category);
      console.log(this.selectedPatient);
    }

  ngOnInit(): void {
    this.getAllCategories();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  onClick():void{
    // this.selectedPatient.category = this.category;
  }

  getAllCategories(){
    // this.categoriesSubscription = this._productService.getCategoriesProducts().subscribe((response: any) => {
    //   this.categories = response;
    // },(error =>{
    //   console.log(error);
    // }));
  }

  ngOnDestroy(): void {
    // this.categoriesSubscription?.unsubscribe();
  }
}
