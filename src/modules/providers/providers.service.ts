import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { ErrorManager } from 'src/utils/error.manager';

@Injectable()
export class HttpCustomService {
    //TODO: SE IMPORTA EL HTTP SERVICE DE AXIOS
    constructor(private readonly httpService: HttpService) { }

    public async apiFindAll() {
        try{
            const response = await firstValueFrom(
                this.httpService.get('https://rickandmortyapi.com/api/character')
            )
            return response.data;
        }catch(error){
            throw ErrorManager.createSignatureError(error.message)
        }
        
    }
}
