import { NgModule } from '@angular/core';

import { MotocicletaRoutingModule } from './motocicleta-routing.module';
import { ListarMotocicletaComponent } from './components/listar-motocicleta/listar-motocicleta.component';
import { MotocicletaComponent } from './components/motocicleta/motocicleta.component';
import { SharedModule } from '@shared/shared.module';
import { MotocicletaService } from './shared/service/motocicleta.service';
import { CrearMotocicletaComponent } from './components/crear-motocicleta/crear-motocicleta.component';
import { BuscarMotocicletaComponent } from './components/buscar-motocicleta/buscar-motocicleta.component';

@NgModule({
  declarations: [
    CrearMotocicletaComponent,
    ListarMotocicletaComponent,
    MotocicletaComponent,
    BuscarMotocicletaComponent
  ],
  imports: [
    MotocicletaRoutingModule,
    SharedModule    
  ],
  providers: [MotocicletaService]
})
export class MotocicletaModule { }