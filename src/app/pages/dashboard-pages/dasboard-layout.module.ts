import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DetailComponent } from './detail/detail.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { DashboardLayoutRoutingModule } from './dasboard-layout.routing';
import { ComponentsModule } from '../../components/components.module';
import { CreateCitaComponent } from './create-cita/create-cita.component';



@NgModule({
  declarations: [
    DashboardComponent,
    DetailComponent,
    CreateCitaComponent
  ],
  exports: [
    DashboardComponent,
    DetailComponent,
    CreateCitaComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    DashboardLayoutRoutingModule,
    SharedModule,
    ComponentsModule
  ]
})
export class DashboardLayoutModule { }
