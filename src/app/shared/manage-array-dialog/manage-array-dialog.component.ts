import { ChangeDetectorRef, Component, Inject, OnDestroy, OnInit } from '@angular/core';
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
  valuesAux: Array<any> = [];
  dataArray: AttentionHour[] = []
  constructor(private _fb: FormBuilder, public matDialogRef: MatDialogRef<ManageArrayDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private cdRef: ChangeDetectorRef) {
    // Object.assign(this.selectedPatient, data.patient);
    // Object.assign(this.category, data.product.category);
    // console.log(this.selectedPatient);) 
    this.dataArray = data.array;
    // console.log(data.array)
    // this.init(data.array, !!data.array.length ? true : false);
    // this.myForm = this._fb.group({
    //   array: this._fb.array(data.array)
    // });
    this.myForm = this._fb.group({
      array: this._fb.array([])
    });
  }

  ngOnInit(): void {
    // this.addElement();
    this.init(this.dataArray, !!this.dataArray.length ? true : false);
  }

  init(array: AttentionHour[], hasElements: boolean) {
    console.log(array)
    if (!hasElements) {
      this.addElement();
    }
    else {
      array.forEach(element => {
        this.values.push(element.attentionHour);
        this.valuesAux.push(element.attentionHour);
      });
      array.forEach(element => {
        this.addElement();
      });
    }
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

  remove(i: number) {
    this.getArray().removeAt(i);
    this.values.splice(i, 1)
  }

  save() {
    let hours = this.myForm.value;
    for (var element of hours.array) {
      if (element.attentionHour == undefined) {
        let index = hours.array.indexOf(element);
        hours.array.splice(index, 1);
      }
    }
    this.matDialogRef.close(this.bubbleSort(hours.array));
  }

  cancel() {
    this.matDialogRef.close();
  }

  bubbleSort(items: AttentionHour[]) {
    var length = items.length;
    for (var i = 0; i < length; i++) {
      for (var j = 0; j < (length - i - 1); j++) {
        if (items[j].attentionHour > items[j + 1].attentionHour) {
          var tmp = items[j];
          items[j] = items[j + 1];
          items[j + 1] = tmp;
        }
      }
    }
    return items;
  }
}