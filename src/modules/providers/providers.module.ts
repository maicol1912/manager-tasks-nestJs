import { Global, Module } from '@nestjs/common';
import { HttpCustomService } from './providers.service';
import { HttpModule } from '@nestjs/axios';

@Global()
@Module({
  //TODO: DEBEMOS IMPORTAR EL HTTPMODULE DE AXIOS PARA PODERLO USAR
  imports:[HttpModule],
  providers: [HttpCustomService],
  //TODO: DEBEMOS EXPORTAR TODO LO QUE IMPORTEMOS DESDE OTROS LUGARES
  //TODO: Y DEBEMOS EXPORTAR EL SERVICIO
  exports: [HttpModule,HttpCustomService]
})
export class ProvidersModule {}
