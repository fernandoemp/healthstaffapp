import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { HeaderComponent } from './header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { AngularMaterialModule } from './core/angular-material/angular-material.module';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PatientComponent } from './patient/patient.component';
import { PatientDialogComponent } from './shared/patient-dialog/patient-dialog.component';
import { ConfirmDialogComponent } from './shared/confirm-dialog/confirm-dialog.component';
import { LoadingComponent } from './shared/loading/loading.component';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { CareScheduleComponent } from './care-schedule/care-schedule.component';
import { ManageArrayDialogComponent } from './shared/manage-array-dialog/manage-array-dialog.component';
import { VitalSignComponent } from './vital-sign/vital-sign.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    SidenavComponent,
    HeaderComponent,
    HomeComponent,
    LoginComponent,
    PatientComponent,
    PatientDialogComponent,
    ConfirmDialogComponent,
    LoadingComponent,
    CareScheduleComponent,
    ManageArrayDialogComponent,
    VitalSignComponent
  ],
  imports: [
    AngularMaterialModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,
    NgxMaterialTimepickerModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
