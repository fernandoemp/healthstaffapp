import { User } from "./user.class";

export class VitalSign {
    id: number | undefined;
    bloodPressure: string | undefined;
    breathing: string | undefined;
    pulse: string | undefined;
    temperature: string | undefined;
    observation: string | undefined;
    date: string;
    professional: User | undefined;

    constructor() {
        this.date = new Date().toISOString().slice(0,10);
    }
}
