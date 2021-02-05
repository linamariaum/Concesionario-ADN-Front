import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BuscarVentaComponent } from './components/buscar-venta-cliente/buscar-venta.component';
import { CrearVentaComponent } from './components/crear-venta/crear-venta.component';
import { ListarVentaComponent } from './components/listar-venta/listar-venta.component';
import { VentaComponent } from './components/venta/venta.component';

const routes: Routes = [
    {
      path: '',
      component: VentaComponent,
      children: [
        {
          path: 'listar',
          component: ListarVentaComponent
        },
        {
          path: 'crear',
          component: CrearVentaComponent
        },
        {
          path: 'buscar',
          component: BuscarVentaComponent
        }
      ]
    }
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class VentaRoutingModule { }