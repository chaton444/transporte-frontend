import { Component, OnInit, AfterViewInit } from '@angular/core';
import { DashboardService } from './service/dashboard.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import * as echarts from 'echarts';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, AfterViewInit {
  datosFiltrados: any[] = [];
  anioInicio: number | null = null;
  anioFin: number | null = null;
  mesInicio: number | null = null;
  mesFin: number | null = null;
  transporte: string = 'Todos';
  incluirPreliminares: boolean = false;
  years: number[] = [];
  months = [
    { value: 1, name: 'Enero' }, { value: 2, name: 'Febrero' }, { value: 3, name: 'Marzo' },
    { value: 4, name: 'Abril' }, { value: 5, name: 'Mayo' }, { value: 6, name: 'Junio' },
    { value: 7, name: 'Julio' }, { value: 8, name: 'Agosto' }, { value: 9, name: 'Septiembre' },
    { value: 10, name: 'Octubre' }, { value: 11, name: 'Noviembre' }, { value: 12, name: 'Diciembre' }
  ];
  transportes = [
    'Tren Eléctrico', 'Macrobús Servicio Alimentador', 'Mi Transporte Eléctrico',
    'MI Macro Periférico Alimentador', 'Trolebús', 'Sistema Integral del Tren Ligero',
    'Mi Macro Periférico Troncal', 'Macrobús Servicio Troncal'
  ];

  constructor(private dashboardService: DashboardService, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.generarYears();
  }

  ngAfterViewInit(): void {
    this.initChart();
    window.addEventListener('resize', this.resizeChart);
  }
  
  ngOnDestroy(): void {
    window.removeEventListener('resize', this.resizeChart);
  }
  
  resizeChart = (): void => {
    const chartDom = document.getElementById('chart')!;
    const myChart = echarts.getInstanceByDom(chartDom);
    if (myChart) {
      myChart.resize();
    }
  };
  

  generarYears() {
    for (let year = 1997; year <= 2023; year++) {
      this.years.push(year);
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
  goToHome() {
    this.router.navigate(['/home']);  
  }
  
  cargarDatos(): void {
    if (this.anioInicio !== null && this.anioFin !== null && this.mesInicio !== null && this.mesFin !== null) {
      const transporteFiltro = this.transporte === 'Todos' ? 'Todos' : this.transporte;
      this.dashboardService
        .getFilteredData(this.anioInicio, this.anioFin, this.mesInicio, this.mesFin, transporteFiltro, this.incluirPreliminares)
        .subscribe({
          next: (data) => {
            this.datosFiltrados = data;
            this.updateChart(); // Actualiza la gráfica con los datos filtrados
          },
          error: (err) => {
            console.error('Error al cargar los datos:', err);
          },
        });
    }
  }

  aplicarFiltros(): void {
    this.cargarDatos();
  }

  initChart(): void {
    const chartDom = document.getElementById('chart')!;
    const myChart = echarts.init(chartDom);

    const option = {
      title: {
        text: 'Estadísticas de Transporte',
        left: 'center',
        top: '10',
        textStyle: {
          fontSize: 20,
          fontWeight: 'bold',
        },
      },
      toolbox: {
        feature: {
          saveAsImage: {},
        },
      }
      ,
      tooltip: {
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985'
          }
        },
        trigger: 'axis',
        backgroundColor: 'rgba(250, 250, 250, 0.7)',
        padding: [10, 15],
        borderRadius: 5,
        formatter: '{b0}<br/>{a0}: {c0}<br/>{a1}: {c1}<br/>{a2}: {c2}',
      },
      legend: {
        data: ['Ingresos', 'Kilómetros', 'Pasajeros'],
        top: '50',
        textStyle: {
          color: '#6c757d',
        },
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: [],
        axisLine: {
          lineStyle: {
            color: '#6c757d',
          },
        },
      },
      yAxis: {
        type: 'value',
         
        axisLine: {
          lineStyle: {
            color: '#6c757d',
          },
        },
      },
      series: [
        {
          name: 'Ingresos',
          type: 'line',
          data: [],
         
          smooth: true,
          lineStyle: {
            width: 0
          },
          showSymbol: false,
          areaStyle: {
            opacity: 0.8,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgb(55, 162, 255)'
              },
              {
                offset: 1,
                color: 'rgb(116, 21, 219)'
              }
            ])
          },
          emphasis: {
            focus: 'series'
          },
        },
        
        
        {
          name: 'Pasajeros',
          type: 'line',
          data: [],
          smooth: true,
          lineStyle: {
            width: 0
          },
          showSymbol: false,
          areaStyle: {
            opacity: 0.8,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgb(255, 191, 0)'
              },
              {
                offset: 1,
                color: 'rgb(224, 62, 76)'
              }
            ])
          },
        },
        {
          name: 'Kilómetros',
          type: 'line',
          
          smooth: true,
          lineStyle: {
            width: 0
          },
          showSymbol: false,
          areaStyle: {
            opacity: 0.8,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgb(128, 255, 165)'
              },
              {
                offset: 1,
                color: 'rgb(1, 191, 236)'
              }
            ])
          },
          emphasis: {
            focus: 'series'
          },


        },
      ],
      grid: {
        left: '5%',
        right: '5%',
        bottom: '15%',
        top: '20%',
        containLabel: true,
      },
    };

    myChart.setOption(option);
    (this as any).chart = myChart;
  }

  updateChart(): void {
    if (!(this as any).chart) return;

    const labels = this.datosFiltrados.map(item => `${item.anio}-${item.id_mes}`);
    const ingresos = this.datosFiltrados.map(item => item.ingresos || 0);
    const kilometros = this.datosFiltrados.map(item => item.kilometros || 0);
    const pasajeros = this.datosFiltrados.map(item => item.pasajeros || 0);

    const newOption = {
      xAxis: { data: labels },
      series: [
        { name: 'Ingresos', data: ingresos },
        { name: 'Kilómetros', data: kilometros },
        { name: 'Pasajeros', data: pasajeros },
      ]
    };

    (this as any).chart.setOption(newOption);
  }
}
