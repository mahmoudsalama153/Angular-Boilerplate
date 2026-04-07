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
    filter: IDashboardTableFilter,
  ): Observable<IBaseApiResponse<IDashboardRecord[]>> {
    // return this.baseHttpService.post(API_ENDPOINTS.dashboard.getDashboardData, filter);
    return of({
      body: [
        {
          id: '10019',
          title:
            'Eiusmod labore suscipit quia consequatur expedita magni sed deleniti suscipit dolorum rerum eum aut eu voluptate aut vel impedit',
          type: 2,
          joinDate: '2026-03-12T13:44:24.4779737',
          status: 2,
          actions: [1, 2, 3],
          assignedEmployee: 'AHMED ABDULMAJEED ALGHAMDI',
          email: 'sad@asd.com',
          name: 'jihasd asdasd'
        },
        {
          id: '10019',
          title:
            'Eiusmod labore suscipit quia consequatur expedita magni sed deleniti suscipit dolorum rerum eum aut eu voluptate aut vel impedit',
          type: 2,
          joinDate: '2026-03-12T13:44:24.4779737',
          status: 2,
          actions: [1, 2, 3],
          assignedEmployee: 'AHMED ABDULMAJEED ALGHAMDI',
          email: 'sad@asd.com',
          name: 'jihasd asdasd'
        }, {
          id: '10019',
          title:
            'Eiusmod labore suscipit quia consequatur expedita magni sed deleniti suscipit dolorum rerum eum aut eu voluptate aut vel impedit',
          type: 2,
          joinDate: '2026-03-12T13:44:24.4779737',
          status: 2,
          actions: [1, 2, 3],
          assignedEmployee: 'AHMED ABDULMAJEED ALGHAMDI',
          email: 'sad@asd.com',
          name: 'jihasd asdasd'
        }, {
          id: '10019',
          title:
            'Eiusmod labore suscipit quia consequatur expedita magni sed deleniti suscipit dolorum rerum eum aut eu voluptate aut vel impedit',
          type: 2,
          joinDate: '2026-03-12T13:44:24.4779737',
          status: 2,
          actions: [1, 2, 3],
          assignedEmployee: 'AHMED ABDULMAJEED ALGHAMDI',
          email: 'sad@asd.com',
          name: 'jihasd asdasd'
        }, {
          id: '10019',
          title:
            'Eiusmod labore suscipit quia consequatur expedita magni sed deleniti suscipit dolorum rerum eum aut eu voluptate aut vel impedit',
          type: 2,
          joinDate: '2026-03-12T13:44:24.4779737',
          status: 2,
          actions: [1, 2, 3],
          assignedEmployee: 'AHMED ABDULMAJEED ALGHAMDI',
          email: 'sad@asd.com',
          name: 'jihasd asdasd'
        },
      ],
      success: true,
      statusCode: 200,
      message: [],
      errors: null,
      timestamp: new Date().toISOString(),
    } as IBaseApiResponse<IDashboardRecord[]>);
  }
}
