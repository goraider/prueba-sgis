import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'triage-colores-formulario',
  templateUrl: './formulario.component.html',
  styleUrls:["./formulario.component.css"]
})

export class FormularioComponent {

  /**
  * Contiene los datos del formulario que comunican a la vista con el componente.
  * @type {FormGroup}
  */
  dato: FormGroup;

  /**
  * Contiene el tamaño del cuerpo de la seccion donde esten los controles en la vista.
  * @type {any}
  */
  tamano = document.body.clientHeight;

  /**
  * Contiene el tamaño del cuerpo del editor de texto para darle dormato al text area que esta en la vista.
  * @type {any}
  */
  CkeditorConfig = {
    height:document.body.clientHeight - 760
  }

  /**
  * Este método inicializa la carga de las dependencias 
  * que se necesitan para el funcionamiento del catalogo
  */
  constructor(private fb: FormBuilder) { }

  /**
  * Este método inicializa la carga de la vista asociada junto los datos del formulario
  * @return void
  */
  ngOnInit() {
    this.dato = this.fb.group({
      nombre: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      tiempo_minimo: ['', [Validators.required, Validators.pattern("[0-9-:]*")]],
      tiempo_maximo: ['', [Validators.required, Validators.pattern("[0-9-:]*")]]
    });


    //Solo si se va a cargar catalogos poner un <a id="catalogos" (click)="ctl.cargarCatalogo('modelo','ruta')">refresh</a>
    //document.getElementById("catalogos").click();
  }


}
