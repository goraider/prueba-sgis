import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Title }     from '@angular/platform-browser';
import { forEach } from '@angular/router/src/utils/collection';
import { CrudService } from '../../crud/crud.service';

import { BaseChartDirective } from 'ng2-charts/ng2-charts';
import { Router } from '@angular/router';




@Component({
  selector: 'app-total-ingresos',
  templateUrl: './total-ingresos.component.html',
  styleUrls: ['./total-ingresos.component.css']
})
export class TotalIngresosComponent implements OnInit {

    public clues = JSON.parse(localStorage.getItem("clues"));

    @ViewChild(BaseChartDirective) chart: BaseChartDirective;

    //@ViewChild(BaseChartDirective) _chart;

    datos: any[] = [];

    public doughnutChartLabels:string[] = [];
    public doughnutChartData:number[] = [];
    public doughnutChartColors:{}[] = [{backgroundColor: ['rgb(102, 153, 51, 0.9)', 'rgb(255, 204, 51, 0.9)', 'rgb(204, 51, 0, 0.9)']}];
    public doughnutChartType:string = 'doughnut';
  
    public totalIncidencias: any = '';
    public nombreColor: any[] = [];
    

    cargando: boolean = false;
    
    constructor(private title: Title,
                private crudService: CrudService,
                private ruta: Router) { }

    ngOnInit() {

      this.listar('dashboard');
     
    }


    listar(url) {
    
      this.cargando = true;
      this.crudService.lista_general(url).subscribe(
          resultado => {
              

              this.datos = resultado as any[];
              //this.datos.push(...resultado);

              this.datos[1].triage.forEach(dete => {

                this.doughnutChartLabels.push(dete.nombre);
                this.doughnutChartData.push(dete.total);
                this.totalIncidencias = this.datos[0].totalTriage;
                this.nombreColor.push(dete);
                //this.numeroColor.push(dete.total);

                //console.log(this.chart);

              });

              this.cargando = false;

         
            setTimeout(() => {
              if (this.chart && this.chart.chart && this.chart.chart.config) {
                this.chart.chart.update();
              }
            });

              
  
          },
          error => {
  
          }
      );
    }

    cambiar_clues_dash(e){
      this.ruta.navigate(['/cambiar-clues']);
    }

  
}