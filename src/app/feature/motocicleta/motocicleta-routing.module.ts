import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BuscarMotocicletaComponent } from './components/buscar-motocicleta/buscar-motocicleta.component';
import { CrearMotocicletaComponent } from './components/crear-motocicleta/crear-motocicleta.component';
import { ListarMotocicletaComponent } from './components/listar-motocicleta/listar-motocicleta.component';
import { MotocicletaComponent } from './components/motocicleta/motocicleta.component';

const routes: Routes = [
    {
      path: '',
      component: MotocicletaComponent,
      children: [
        {
          path: 'crear',
          component: CrearMotocicletaComponent
        },
        {
          path: 'listar',
          component: ListarMotocicletaComponent
        },
        {
          path: 'buscar',
          component: BuscarMotocicletaComponent
        }
      ]
    }
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class MotocicletaRoutingModule { }
  