import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ClientService } from '../services/client.service';
import { ClientDto } from '../models/client-dto';
import { Router } from '@angular/router';
import { GetClientRequestDto } from '../models/get-client-request-dto';

@Component({
  selector: 'app-client-form',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.css']
})
export class ClientFormComponent {

  documentTypes: string[] = ['C', 'P']; // Tipos de documento permitidos
  clientForm: FormGroup; // FormGroup para el formulario
  client: ClientDto | undefined; // Variable para almacenar la información del cliente
  errorMessage: string | undefined; // Variable para almacenar el mensaje de error
  isLoading: boolean = false; // Variable para controlar la visualización del spinner de carga

  constructor(
    private clientService: ClientService,
    private router: Router
  ) {
    this.clientForm = new FormGroup({
      documentType: new FormControl('', Validators.required),
      documentNumber: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(11),
        Validators.pattern(/^[0-9]+$/)
      ])
    });
  }

  onSubmit(): void { // Método que se ejecuta al enviar el formulario
    this.isLoading = true; // Muestra el spinner de carga
    this.errorMessage = undefined; // Limpia el mensaje de error

    if (this.clientForm.valid) { // Verifica si el formulario es válido
      this.clientService.getClientInfo(this.clientForm.value as GetClientRequestDto).subscribe({ // Llama al servicio para obtener la información del cliente
        next: (client) => { // Si la respuesta es exitosa
          this.client = client; // Almacena la información del cliente
          this.clientService.setClientInfo(client); // Guarda la información del cliente en el servicio
          this.router.navigate(['/client-info'], { state: { client: client } }); // Navega a la vista client-info
        },
        error: (error) => { // Si ocurre un error
          this.errorMessage = error.message; // Almacena el mensaje de error
          this.isLoading = false; // Oculta el spinner de carga
        },
        complete: () => { // Se ejecuta al finalizar la solicitud
          this.isLoading = false; // Oculta el spinner de carga
        }
      });
    } else {
      this.errorMessage = 'Por favor, complete el formulario correctamente.'; // Muestra un mensaje de error si el formulario no es válido
      this.isLoading = false; // Oculta el spinner de carga
    }
  }

}
