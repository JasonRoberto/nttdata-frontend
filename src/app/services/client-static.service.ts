import { Injectable } from '@angular/core';
import { ClientDto } from '../models/client-dto';
import { GetClientRequestDto } from '../models/get-client-request-dto';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClientStaticService {
  private clientData: ClientDto = {
    firstName: 'Pepito',
    secondName: 'Perez',
    firstSurname: 'Rodríguez',
    secondSurname: 'González',
    phone: '3001234567',
    address: 'Calle 123 # 45 - 67',
    city: 'Bogotá',
  };

  constructor() {}

  getClientInfo( getClientRequestDto: GetClientRequestDto): Observable<ClientDto> {
    return of(this.clientData); // Simula una respuesta del backend
  }

  setClientInfo(client: ClientDto) {
    console.log(client); // Imprime la información del cliente en la consola
    this.clientData = client; // Guarda la información del cliente en el servicio
  }

  getClientData(): ClientDto {
    return this.clientData; // Devuelve la información del cliente almacenada en el servicio
  }
}
