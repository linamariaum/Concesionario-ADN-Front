import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';
import { VentaService } from './shared/service/venta.service';
import { VentaRoutingModule } from './venta-routing.module';
import { VentaComponent } from './components/venta/venta.component';
import { ListarVentaComponent } from './components/listar-venta/listar-venta.component';

import { DetalleVentaComponentDialog } from './components/detalle-venta/detalle-venta.component';
import { CrearVentaComponent } from './components/crear-venta/crear-venta.component';
import { BuscarVentaComponent } from './components/buscar-venta-cliente/buscar-venta.component';

@NgModule({
  declarations: [
    ListarVentaComponent,
    VentaComponent,
    CrearVentaComponent,
    BuscarVentaComponent,
    DetalleVentaComponentDialog
  ],
  entryComponents: [
    DetalleVentaComponentDialog
  ],
  imports: [
    VentaRoutingModule,
    SharedModule    
  ],
  providers: [VentaService]
})
export class VentaModule { }