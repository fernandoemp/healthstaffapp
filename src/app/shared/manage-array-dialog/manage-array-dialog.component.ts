import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AttentionHour } from 'src/app/core/classes/attetion-hour.class';

@Component({
  selector: 'app-manage-array-dialog',
  templateUrl: './manage-array-dialog.component.html',
  styleUrls: ['./manage-array-dialog.component.scss']
})
export class ManageArrayDialogComponent implements OnInit {
  myForm: FormGroup;
  values: Array<any> = [];
  constructor(private _fb: FormBuilder, public matDialogRef: MatDialogRef<ManageArrayDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private cdRef: ChangeDetectorRef) {
    // Object.assign(this.selectedPatient, data.patient);
    // Object.assign(this.category, data.product.category);
    // console.log(this.selectedPatient);) 

    this.myForm = this._fb.group({
      array: this._fb.array(data.array),
    });
  }
  ngOnInit(): void {
    this.addElement();
  }

  getArray(): FormArray {
    return this.myForm.get("array") as FormArray
  }

  newElement(): FormGroup {
    let value = undefined;
    this.values.push(value)
    return this._fb.group({
      id: 0, attentionHour: this.values[this.values.length - 1]
      // qty: '',  
      // price: '',  
      // hours: ''
    } as AttentionHour);
  }

  addElement() {
    this.getArray().push(this.newElement());
    this.cdRef.detectChanges();
  }

  removeQuantity(i: number) {
    this.getArray().removeAt(i);
    this.values.splice(i, 1)
  }

  save() {
    this.matDialogRef.close(this.myForm.value);
  }
}