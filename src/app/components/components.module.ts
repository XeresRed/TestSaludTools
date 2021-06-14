import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CitasListComponent } from './citas-list/citas-list.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [CitasListComponent],
  exports: [CitasListComponent],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class ComponentsModule { }
