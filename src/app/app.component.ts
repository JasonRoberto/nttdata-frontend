import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { ClientFormComponent } from "./client-form/client-form.component";
import { ClientInfoComponent } from "./client-info/client-info.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ReactiveFormsModule ,ClientFormComponent, ClientInfoComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'nttdata-client-frontend';
}
