import { User } from "./user.class";

export class VitalSign {
    id: number | undefined;
    bloodPressure: string | undefined;
    breathing: string | undefined;
    pulse: string | undefined;
    temperature: string | undefined;
    observation: string | undefined;
    date: Date;
    professional: User | undefined;

    constructor() {
        this.date = new Date();
    }
}
