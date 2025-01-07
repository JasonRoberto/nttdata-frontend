import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientDto } from '../models/client-dto';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-client-info',
  imports: [CommonModule, RouterModule],
  templateUrl: './client-info.component.html',
  styleUrls: ['./client-info.component.css']
})
export class ClientInfoComponent {
  client?: ClientDto;

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state){
      console.log("uno" + navigation.extras.state['client']);
      this.client = navigation.extras.state['client'] as ClientDto;
    }
    // Obtener la información del cliente del estado de la ruta
    if (history.state.client) {
      console.log("dos" + history.state.client);
      this.client = history.state.client as ClientDto;
    } else {
      // Manejar el caso en que no se encuentre la información del cliente
      console.log("tres" );
      console.error('Información del cliente no encontrada.');
    }
  }
}
