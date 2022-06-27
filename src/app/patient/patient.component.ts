import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AttentionHour } from '../core/classes/attetion-hour.class';
import { Patient } from '../core/classes/patient.class';
import { LocalStorageService } from '../core/services/local-storage.service';
import { PatientService } from '../core/services/patient.service';
import { ManageArrayDialogComponent } from '../shared/manage-array-dialog/manage-array-dialog.component';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss']
})
export class PatientComponent implements OnInit {

  selectedPatient = new Patient();
  test: any | undefined;
  modify = false;
  myForm = this._fb.group({
    identityCardNumber: ['', [Validators.required]],
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    hospitalBed: ['',],
    hospitalRoom: ['',],
    address: ['',],
    familyContact: ['',],
    healthcareSystem: ['',],
    healthcareSystemId: ['',],
    hours: ['',]

    // ospitalRoom: ['', ]
    // hours: ['', ]
    // stock: ['', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
    // categorySelected: ['', [Validators.required]],
    // description: ['', [Validators.required]]
  });
  dataSource!: MatTableDataSource<AttentionHour>;
  displayedColumns: string[];




  constructor(private patientService: PatientService, private _fb: FormBuilder, private matDialog: MatDialog, private router: Router, private localStorageService: LocalStorageService) {
    this.displayedColumns = [
      // "id",

      "attentionHour",
    ];

  }

  ngOnInit(): void {
    this.selectedPatient = this.localStorageService.getItem('selectedPatient');
    this.dataSource = new MatTableDataSource(this.selectedPatient.attentionHours);
    this.isModify();

  }

  cancel(): void {
    this.router.navigate(['home']);
  }
  
  isModify(){
    let patients = this.patientService.getAllPatients();
    let index = patients.findIndex(x => x.id == this.selectedPatient.id);
    if (index != -1) {
      this.modify = true;
    }
  }

  save(): void {
    let patients = this.patientService.getAllPatients();
    let index = patients.findIndex(x => x.id == this.selectedPatient.id);
    console.log(index)
    if (index != -1) {
      patients.splice(index, 1, this.selectedPatient);
      console.log(patients)
      this.patientService.updatePatients(patients);
    }
    else {
      this.patientService.setPatient(this.selectedPatient);
    }
    this.router.navigate(['home']);
  }

  addHours(attentionHours: AttentionHour[]) {
    console.log(attentionHours);
    const dialogRef = this.matDialog.open(ManageArrayDialogComponent, {
      disableClose: true, panelClass: 'custom-container-equals-border-radius',
      data: { title: 'Attention Hours', array: attentionHours, update: false, hasElements: !!attentionHours.length ? true : false },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result != undefined) {
        this.selectedPatient.attentionHours = result;
        this.dataSource = new MatTableDataSource(this.selectedPatient.attentionHours);
        // this.selectedPatient.attentionHours.forEach((element: AttentionHour) => {
        //   console.log(element)
        // });
      }
    });
  }
}