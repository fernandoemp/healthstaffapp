import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
export class PatientComponent implements OnInit, OnDestroy {

  selectedPatient = new Patient();
  test: any | undefined;
  modify = false;
  myForm = this._fb.group({
    identityCardNumber: ['', [Validators.required]],
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    hospitalBed: ['', [Validators.required]],
    hospitalRoom: ['', [Validators.required]],
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




  constructor(private patientService: PatientService, private _fb: FormBuilder, private matDialog: MatDialog, private router: Router, private localStorageService: LocalStorageService
    , private dialog: MatDialog, private _toastr: ToastrService) {
    this.displayedColumns = [
      // "id",

      "attentionHour",
    ];

  }

  ngOnDestroy(): void {
    this.localStorageService.setItem('selectedPatient', new Patient());
  }

  ngOnInit(): void {
    this.selectedPatient = this.localStorageService.getItem('selectedPatient');
    this.dataSource = new MatTableDataSource(this.selectedPatient.attentionHours);
    this.isModify();

  }

  cancel(): void {
    if (!this.modify) {
      let index = this.localStorageService.getItem('patientId')
      index--;
      this.localStorageService.setItem('patientId', index);
    }
    this.router.navigate(['home']);
  }

  isModify() {
    let patients = this.patientService.getAllPatients();
    let index = patients.findIndex(x => x.id == this.selectedPatient.id);
    console.log(index);
    if (index != -1) {
      this.modify = true;
    }
  }

  update(): void {
    let patients = this.patientService.getAllPatients();
    let index = patients.findIndex(x => x.id == this.selectedPatient.id);
    if (index != -1) {
      patients.splice(index, 1, this.selectedPatient);
      this.patientService.updatePatients(patients);
      this._toastr.info("Patient updated successfully");
    }
    else {
      this.patientService.setPatient(this.selectedPatient);
      this._toastr.info("Patient saved successfully");
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