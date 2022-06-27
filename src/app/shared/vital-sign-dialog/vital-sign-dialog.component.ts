import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Patient } from 'src/app/core/classes/patient.class';
import { VitalSign } from 'src/app/core/classes/vital-sign.class';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { PatientService } from 'src/app/core/services/patient.service';

@Component({
  selector: 'app-vital-sign-dialog',
  templateUrl: './vital-sign-dialog.component.html',
  styleUrls: ['./vital-sign-dialog.component.scss']
})
export class VitalSignDialogComponent implements OnInit {

  vitalSign = new VitalSign();
  test: any | undefined;
  myForm = this._fb.group({
    bloodPressure: ['', [Validators.required]],
    breathing: ['', [Validators.required]],
    pulse: ['', [Validators.required]],
    temperature: ['', [Validators.required]],
    observation: ['',]
  });
  bloodPressure: string | undefined;
  breathing: string | undefined;
  pulse: string | undefined;
  temperature: string | undefined;
  observation: string | undefined;

  constructor(private _patientService: PatientService, private _fb: FormBuilder, public dialogRef: MatDialogRef<VitalSignDialogComponent>, private localStorageService: LocalStorageService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    // Object.assign(this.selectedPatient, data.patient);
    // // Object.assign(this.category, data.product.category);
    // console.log(this.selectedPatient);
  }

  ngOnInit(): void {
  }

  cancel(): void {
    this.dialogRef.close();
  }
  save(): void {
    this.vitalSign.professional = this.localStorageService.getItem("currentUser");
    this.dialogRef.close(this.vitalSign);
  }

  ngOnDestroy(): void {
    // this.categoriesSubscription?.unsubscribe();
  }
}
