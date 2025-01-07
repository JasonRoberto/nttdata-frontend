import { Routes } from '@angular/router';
import { ClientInfoComponent } from './client-info/client-info.component';
import { ClientFormComponent } from './client-form/client-form.component';
import { ClientFormNewComponent } from './client-form-new/client-form-new.component';

export const routes: Routes = [
  { path: '', component: ClientFormNewComponent},
  { path: 'client-form', component: ClientFormComponent },
  { path: 'client-info', component: ClientInfoComponent },
];
