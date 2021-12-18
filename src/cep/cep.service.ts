import { Observable, map } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { Injectable, Inject, CACHE_MANAGER } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { AxiosResponse } from 'axios';

@Injectable()
export class CepService {

    constructor(private httpService: HttpService,
        @Inject(CACHE_MANAGER) private cacheManager: Cache) { }


    /* async buscarCep(codigo: string) {
        const uri = 'https://viacep.com.br';
        const url = `${uri}/ws/${codigo}/json/`;
        // const url = `https://viacep.com.br/ws/71250120/json/`;
        const result = (await this.httpService.get(url)
            .toPromise()).data;
        return {
            cep: result.cep,
            logradouro: result.logradouro,
            cidade: result.localidade,
            uf: result.uf
        };
    } */
    buscarCep(codigo: string): Observable<AxiosResponse<any, any>> {
        // esse metodo está apresentando inconsistencia quando se concatena a string
        return this.httpService.get(`https://viacep.com.br/ws/${codigo}/json/`)
            .pipe(
                map((res) => res.data))
    }
}
