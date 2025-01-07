import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { GetClientRequestDto } from '../models/get-client-request-dto';
import { ClientDto } from '../models/client-dto';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private apiUrl = 'http://localhost:8092/nttdata/api/v1/client'; // URL del backend

  constructor(
    private http: HttpClient // Inyecta el servicio HttpClient
  ) { }

  getClientInfo(getClientRequestDto: GetClientRequestDto): Observable<ClientDto> {

    const requestBody = new HttpParams({ fromObject: { ...getClientRequestDto } });

    return this.http.get<ClientDto>(this.apiUrl, { params: requestBody }).pipe(
      catchError(this.handleError)
    );
  }

  setClientInfo(client: ClientDto): void {
    localStorage.setItem('clientInfo', JSON.stringify(client));
  }

  getClientInfoFromLocalStorage(): ClientDto | null {
    const clientInfo = localStorage.getItem('clientInfo');
    return clientInfo ? JSON.parse(clientInfo) : null;
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Ocurrió un error. Por favor, inténtelo de nuevo más tarde.';
    if (error.status === 400) {
      errorMessage = 'Solicitud inválida. Por favor, verifique los datos ingresados.';
    } else if (error.status === 404) {
      errorMessage = 'Cliente no encontrado.';
    } else if (error.status === 500) {
      errorMessage = 'Error interno del servidor.';
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }

}
