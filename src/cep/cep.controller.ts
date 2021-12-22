import { ApiTags } from '@nestjs/swagger';
import { CepService } from './cep.service';
import { Controller, Param, Get, UseInterceptors, CacheInterceptor } from '@nestjs/common';

@ApiTags('cep')
@Controller('cep')
export class CepController {

    constructor(private cepService: CepService) { }

    /* @Get(':codigo')
    async buscarCep(@Param('codigo') codigo: string) {
        return await this.cepService.buscarCep(codigo);
    } */

    @UseInterceptors(CacheInterceptor)
    @Get(':codigo')
    buscarCep(@Param('codigo') codigo: string) {
        return this.cepService.buscarCep(codigo);
    }
}
