import { AttentionHour } from "./attetion-hour.class";
import { VitalSign } from "./vital-sign.class";

export class Patient {
    id: number | undefined;
    firstName: string | undefined;
    lastName: string | undefined;
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
    }
}
