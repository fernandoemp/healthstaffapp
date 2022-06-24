import { Injectable } from '@angular/core';
import { AttentionHour } from '../classes/attetion-hour.class';
import { Patient } from '../classes/patient.class';
import { VitalSign } from '../classes/vital-sign.class';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  // patients: Patient[];

  constructor(private localStorageService: LocalStorageService) {
    this.initPatients();
  }

  initPatients() {
    this.localStorageService.setItem("patients", [{ id: 0, firstName: "Fernando Emanuel", lastName: "Murguia Pizarro", hospitalRoom: "S7", hospitalBed: "25", vitalSigns: [{ id: 0, bloodPressure: "20 to 30", breathing: "80", pulse: "50", temperature: "30", observation: "" } as VitalSign], attentionHours: [{ id: 0, attentionHour: "00:00:00" } as AttentionHour, { id: 1, attentionHour: "06:00:00" } as AttentionHour, { id: 2, attentionHour: "10:00:00" } as AttentionHour, { id: 3, attentionHour: "16:00:00" } as AttentionHour, { id: 4, attentionHour: "20:00:00" } as AttentionHour] } as Patient]);
    return this.localStorageService.getItem("patients");
  }

  getAllPatients(): Patient[] {
    return this.localStorageService.getItem("patients");
  }

  setPatient(patient: Patient) {
    let patients: Patient[] = this.localStorageService.getItem("patients");
    patients.push(patient);
    this.localStorageService.setItem("patients", patients);
  }

  getPatient(id: number) {

  }
}
