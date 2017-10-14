import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router'
import { Router } from '@angular/router';

@Component({
  selector: 'usuarios-formulario',
  templateUrl: './formulario.component.html'
})

export class FormularioComponent {
  dato: FormGroup;
  private cambiarPassword: boolean = false;
  private mostrarCambiarPassword: boolean = false;
  private tab: number = 1;
  private tieneid: boolean = false;

  private paises_id: number = null;
  private estados_id: number = null;
  private municipios_id: number = null;

  private temp_paises_id: number = null;
  private temp_estados_id: number = null;
  private temp_municipios_id: number = null;

  private form_sis_usuarios_contactos;
  private form_sis_usuarios_rfcs;
  private tamano;
  private usuario;
  private activar_super;

  private clues_sel = [];
  private sucursal_sel = [];
  constructor(private fb: FormBuilder, private route: ActivatedRoute) { }

  ngOnInit() {
    this.dato = this.fb.group({
      id: [''],
      nombre: ['', [Validators.required]],
      email: ['', [Validators.required]],
      cambiarPassword: [false, []],
      password: [{ value: '', disabled: true }, [Validators.required]],
      confirmarPassword: [{ value: '', disabled: true }, [Validators.required]],
      foto: [''],
      avatar: [''],
      username: [''],
      direccion: [''],
      colonia: [''],
      numero_exterior: [''],
      numero_interior: [''],
      spam: [''],
      es_super: [0],
      codigo_postal: [''],
      last_login: [''],
      activo: [''],
      paises_id: [''],
      estados_id: [''],
      municipios_id: [''],
      sis_usuarios_contactos: this.fb.array([]),
      sis_usuarios_rfcs: this.fb.array([]),
      sis_usuarios_clues: this.fb.array([]),
      sis_usuarios_sucursales: this.fb.array([]),
      sis_usuarios_dashboards: this.fb.array([]),
      sis_usuarios_reportes: this.fb.array([]),
      sis_usuarios_grupos: this.fb.array([])
    });

    this.form_sis_usuarios_contactos = {
      tipos_medios_id: ['1'],
      valor: ['', [Validators.required]]
    };

    this.form_sis_usuarios_rfcs = {
      tipo_persona: ['Fisica', [Validators.required]],
      rfc: ['', [Validators.required]],
      razon_social: ['', [Validators.required]],
      paises_id: [''],
      estados_id: [''],
      municipios_id: [''],
      localidad: [''],
      colonia: [''],
      calle: [''],
      numero_exterior: [''],
      numero_interior: [''],
      codigo_postal: [''],
      email: ['']
    };

    this.tamano = document.body.clientHeight;
    this.usuario = JSON.parse(localStorage.getItem("usuario"));
    this.activar_super = this.usuario.es_super;

    this.route.params.subscribe(params => {
      if (params['id']) {
        this.tieneid = true;
        this.mostrarCambiarPassword = true;
        setTimeout(() => {
          this.dato.controls["password"].setValue('');
        }, 2000);
      }
      else
        this.toggleCambiarPassword();
    });

    var ip = 0, ie = 0, im = 0, sue = 0;
    this.dato.controls.sis_usuarios_clues.valueChanges.
      subscribe(val => {
        if (val.length > 0 && sue == 0) {
          sue++;
          setTimeout(() => {
            this.verificar_clues();
          }, 1000);

        }
      });
    this.dato.controls.paises_id.valueChanges.
      subscribe(val => {
        if (val && ip == 0) {
          ip++;
          this.temp_paises_id = val;
        }
      });

    this.dato.controls.estados_id.valueChanges.
      subscribe(val => {
        if (val && ie == 0) {
          ie++;
          this.temp_estados_id = val;
        }
      });

    this.dato.controls.municipios_id.valueChanges.
      subscribe(val => {
        if (val && im == 0) {
          im++;
          this.temp_municipios_id = val;
        }
      });

    //Solo si se va a cargar catalogos poner un <a id="catalogos" (click)="ctl.cargarCatalogo('modelo','ruta')">refresh</a>
    document.getElementById("catalogos").click();
  }
  autovalor_pais() {
    setTimeout(() => {
      this.paises_id = this.temp_paises_id;
    }, 2000);
  }
  autovalor_estado() {
    setTimeout(() => {
      this.estados_id = this.temp_estados_id;
    }, 3000);
  }
  autovalor_municipio() {
    setTimeout(() => {
      this.municipios_id = this.temp_municipios_id;
    }, 3000);
  }

  toggleCambiarPassword() {
    this.cambiarPassword = !this.cambiarPassword
    this.dato.controls["password"].setValue('');
    if (this.cambiarPassword) {
      this.dato.get('password').enable();
      this.dato.get('confirmarPassword').enable();
    } else {
      this.dato.get('password').disable();
      this.dato.get('confirmarPassword').disable();
    }
  }

  limpiar_sucursales(clues, user) {
    if (!this.clues_sel[clues.id]) {
      clues.sucursales.forEach(element => {
        var i = 0;
        this.dato.get('sis_usuarios_sucursales').value.forEach(buscar => {
          if (buscar == element.id) {
            this.dato.get('sis_usuarios_sucursales').value.splice(i, 1);
          }
          i++;
        });
      });
    }
  }
  verificar_clues() {
    this.usuario.forEach(element => {
      element.sucursales.forEach(item => {
        if (JSON.stringify(this.dato.get('sis_usuarios_sucursales').value).indexOf(JSON.stringify({ sucursales_id: item.id, sis_usuarios_id: this.dato.get('id').value })) > -1)
          this.sucursal_sel[item.id] = true;
        else
          this.sucursal_sel[item.id] = false;
      });
      if (JSON.stringify(this.dato.get('sis_usuarios_clues').value).indexOf(JSON.stringify({ clues_id: element.id, sis_usuarios_id: this.dato.get('id').value })) > -1)
        this.clues_sel[element.id] = true;
      else
        this.clues_sel[element.id] = false;
    });
  }
}