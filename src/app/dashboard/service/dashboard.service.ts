import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
//servicio del dashboard para captacion de datos de la bd 
export class DashboardService {
  private apiUrl = 'http://3.145.34.206:3000/transport'; // cambiar url por la del servidor cuando la monte  AWS

  constructor(private http: HttpClient) {}

  getFilteredData(
    anioInicio: number,
    anioFin: number,
    mesInicio: number,
    mesFin: number,
    transporte: string,
    incluirPreliminares: boolean
  ): Observable<any> {
    const params = {
      anioInicio: anioInicio.toString(),
      anioFin: anioFin.toString(),
      mesInicio: mesInicio.toString(),
      mesFin: mesFin.toString(),
      transporte,
      incluirPreliminares: incluirPreliminares.toString(),
    };
    return this.http.get(`${this.apiUrl}`, { params });
  }
}