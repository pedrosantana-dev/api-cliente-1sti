import { Module, CacheModule } from '@nestjs/common';
import { CepController } from './cep.controller';
import { CepService } from './cep.service';

import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule,
    CacheModule.register({
      ttl: 5,
      max: 100
    }),],
  controllers: [CepController],
  providers: [CepService]
})
export class CepModule { }
