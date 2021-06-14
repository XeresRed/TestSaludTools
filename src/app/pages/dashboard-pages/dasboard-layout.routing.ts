import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DetailComponent } from './detail/detail.component';
import { CreateCitaComponent } from './create-cita/create-cita.component';

const routes: Routes = [
  {
    path: 'citas',
    component: DashboardComponent
  },
  {
    path: 'citas/detalle/:id',
    component: DetailComponent
  },
  {
    path: 'citas/crear',
    component: CreateCitaComponent
  },
  {
    path: 'citas/actualizar/:id',
    component: CreateCitaComponent
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/citas'
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardLayoutRoutingModule {}
