import { Injectable } from '@angular/core';
import { AttentionHour } from '../classes/attetion-hour.class';
import { Patient } from '../classes/patient.class';
import { User } from '../classes/user.class';
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
    console.log('initPatients')
    this.localStorageService.setItem("patients", [{ id: 0, firstName: "Juan", lastName: "Perez", identityCardNumber: 3800000, hospitalRoom: "7", hospitalBed: "25", vitalSigns: [{ id: 0, date: new Date(), bloodPressure: "20 to 30", breathing: "80", pulse: "50", temperature: "30", observation: "the patient had a high fever and headache throughout the morning", professional: { firstName: "Fernando", lastName: "Murguia", email: "fernando@openix.com.ar",id: "0", password: "fer123", profession: "Tester"} as User } as VitalSign], attentionHours: [{ id: 0, attentionHour: "00:00" } as AttentionHour, { id: 1, attentionHour: "06:00" } as AttentionHour, { id: 2, attentionHour: "10:00" } as AttentionHour, { id: 3, attentionHour: "16:00" } as AttentionHour, { id: 4, attentionHour: "20:00" } as AttentionHour]} as Patient]);
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

  updatePatients(patients: Patient[]) {
    this.localStorageService.setItem("patients", patients);
  }
}
