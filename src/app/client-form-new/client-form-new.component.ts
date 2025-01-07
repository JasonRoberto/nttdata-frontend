import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { ClientStaticService } from '../services/client-static.service';
import { Router } from '@angular/router';
import { GetClientRequestDto } from '../models/get-client-request-dto';
import { ClientDto } from '../models/client-dto';

@Component({
  selector: 'app-client-form-new',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './client-form-new.component.html',
  styleUrl: './client-form-new.component.css'
})
export class ClientFormNewComponent {

  documentTypes: string[] = ['C', 'P']; // Tipos de documento permitidos
  clientForm: FormGroup; // FormGroup para el formulario
  client: ClientDto | undefined; // Variable para almacenar la información del cliente
  errorMessage: string | undefined; // Variable para almacenar el mensaje de error
  isLoading: boolean = false; // Variable para controlar la visualización del spinner de carga
  
  constructor(
    private clientStaticService: ClientStaticService,
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
// Inicializa el formulario con los valores del cliente almacenados en el servicio
    const clientData = this.clientStaticService.getClientData();
  }

  onSubmit() {
    console.log(this.clientForm.value);
    this.isLoading = true; // Spinner de carga
    this.errorMessage = undefined; // Limpia el mensaje de error

    if (this.clientForm.valid) {
      this.clientStaticService.getClientInfo(this.clientForm.value as GetClientRequestDto).subscribe({
        next: (client) => {
          this.client = client; // Almacena la información del cliente
          this.router.navigate(['/client-info'], { state: { client: client } }); // Navega a la vista client-info y pasa la información del cliente como estado
        },
        error: (error) => { // Si ocurre un error
          this.errorMessage = error.message; // Almacena el mensaje de error
          this.isLoading = false; // Oculta el spinner de carga
        },
        complete: () => { // Se ejecuta al finalizar la solicitud
          this.isLoading = false; // Oculta el spinner de carga
        }
      });
    }
    else {
      this.errorMessage = 'Por favor, complete el formulario correctamente.'; // Muestra un mensaje de error si el formulario no es válido
      this.isLoading = false; // Oculta el spinner de carga
    }
  }

}
