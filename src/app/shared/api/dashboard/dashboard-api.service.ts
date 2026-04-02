import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { BaseHttpService } from '../../services/Base-HTTP/base-Http.service';
import { API_ENDPOINTS } from '../api-endpoints';
import { IDashboardRecord, IDashboardTableFilter } from '../../interfaces/dashboard.interface';
import { IBaseApiResponse } from '../../interfaces';

@Injectable({
  providedIn: 'root',
})
export class DashboardApiService {
  private readonly baseHttpService = inject(BaseHttpService);

  getDashboardData(
    filter: IDashboardTableFilter
  ): Observable<IBaseApiResponse<IDashboardRecord[]>> {
    // return this.baseHttpService.post(API_ENDPOINTS.dashboard.getDashboardData, filter);
    return of({
      body: [
        {
          id: '1',
          name: 'John Doe',
          email: 'john.doe@example.com',
          joinDate: new Date().toISOString()
        },
        {
          id: '2',
          name: 'Jane Doe',
          email: 'jane.doe@example.com',
          joinDate: new Date().toISOString()
        }
      ],
      success: true,
      statusCode: 200,
      message: [],
      errors: null,
      timestamp: new Date().toISOString()
    })
  }
}

