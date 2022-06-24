import { Allergy } from "./allergy.class";
import { AttentionHour } from "./attetion-hour.class";
import { MedicalHistory } from "./medical-history.class";
import { VitalSign } from "./vital-sign.class";

export class Patient {
    id: number | undefined;
    firstName: string | undefined;
    lastName: string | undefined;
    address: string | undefined;
    allergies: Allergy[];
    // medicalHistories : MedicalHistory[]; 
    familyContact: string | undefined;
    healthcareSystem: string | undefined;
    healthcareSystemId: number | undefined;
    medicalHistory: string | undefined;
    hospitalRoom: string | undefined;
    hospitalBed: string | undefined;
    vitalSigns: VitalSign[];
    attentionHours: AttentionHour[];

    // constructor( firstName: string, lastName: string){
    //     this.firstName = firstName;
    //     this.lastName = lastName;
    // }
    constructor() {
        this.attentionHours = [];
        this.vitalSigns = [];
        this.allergies = []
        // this.medicalHistories = [];
    }
}
