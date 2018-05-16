/**
* <h1>Derechohabientes Routing Module</h1>
*<p>
* Este modulo se encarga de tener acceso
* a los diferentes componente del catalogo Derechohabientes
* en la carpeta asociada, para poder agregar, editar, listar y/o eliminar
* un nuevo elemento.
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
  { path: 'catalogos/derechohabiente', redirectTo: '/catalogos/derechohabiente/lista', pathMatch: 'full' },
  {
    path: 'catalogos/derechohabiente',
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
export class DerechohabientesRoutingModule { }
