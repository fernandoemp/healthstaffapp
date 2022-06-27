import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CareScheduleComponent } from './care-schedule/care-schedule.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PatientComponent } from './patient/patient.component';
import { VitalSignComponent } from './vital-sign/vital-sign.component';
import { VitalSignsHistoryComponent } from './vital-signs-history/vital-signs-history.component';
// import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'patient', component: PatientComponent },
  { path: 'care-schedule', component: CareScheduleComponent },
  { path: 'vital-sign', component: VitalSignComponent },
  { path: 'vital-signs-history', component: VitalSignsHistoryComponent },
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: '**', pathMatch: 'full', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
