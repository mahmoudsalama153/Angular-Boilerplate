import { IDashboardRecord, IDashboardTableFilter } from "../interfaces";
import { inject } from '@angular/core';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { finalize, tap } from 'rxjs';
import { DashboardApiService } from "../api/dashboard/dashboard-api.service";

interface IDashboardState {
  loading: boolean;
  error: string | null;
  count: number;
  list: IDashboardRecord[];
}

const initialState: IDashboardState = {
  loading: false,
  error: null,
  count: 0,
  list: [],
};

export const DashboardStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store) => {
    const dashboardPlansApiService = inject(DashboardApiService);

    return {
      getDashboardData(filter: IDashboardTableFilter) {
        patchState(store, { loading: true });
        return dashboardPlansApiService.getDashboardData(filter).pipe(
          tap((res) => {
            const data = res.body || [];
            patchState(store, { list: data, count: data.length });
          }),
          finalize(() => {
            patchState(store, { loading: false });
          })
        );
      },
    };
  })
);