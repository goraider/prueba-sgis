/**
* <h1>Estados del Paciente Routing Module</h1>
*<p>
* Este modulo se encarga de tener acceso
* a los diferentes componente del catalogo Estados del Paciente
* en la carpeta asociada, para poder editar, listar o
* agregar un nuevo elemento.
* </p>
*
* @author  Javier Alejandro Gosain Díaz
* @version 2.0
* @since   2018-04-30 
*/

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaComponent } from './lista/lista.component';
import { FormularioComponent } from './formulario/formulario.component';
import { AuthGuard } from '../../auth-guard.service';


const routes: Routes = [
  { path: 'catalogos/estado-paciente', redirectTo: '/catalogos/estado-paciente/lista', pathMatch: 'full' },
  {
    path: 'catalogos/estado-paciente',
    children: [
       { path: 'lista', component: ListaComponent},
       { path: 'nuevo', component: FormularioComponent },
       { path: 'editar/:id', component: FormularioComponent},
    ],
    canActivate: [AuthGuard]
  }
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class EstadosPacientesRoutingModule { }
