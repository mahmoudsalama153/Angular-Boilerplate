import { computed, inject, Injectable, signal } from '@angular/core';
import { AbstractServiceFilter } from '../../../../shared/classes/abstract-service-filter';
import { IDashboardTableFilter } from '../../../../shared/interfaces/dashboard.interface';
import { DashboardStore } from '../../../../shared/stores/dashboard.store';
import { DashboardFilter } from '../../classes/dashboard-filter.class';
import { take } from 'rxjs';

@Injectable()
export class DashboardFilterService extends AbstractServiceFilter<IDashboardTableFilter> {

  store = inject(DashboardStore);
  filterClass = new DashboardFilter();
  filter = signal(this.filterClass.filter);
  adaptedFilter = computed(() => {
    var filter = this.filter();
    return {
      ...filter,
      joinDateFrom: filter.joinDateFrom ? new Date(filter.joinDateFrom).toLocaleDateString('en-CA') : undefined,
      joinDateTo: filter.joinDateTo ? new Date(filter.joinDateTo).toLocaleDateString('en-CA') : undefined,
    };
  });

  showClearAll = computed(() => {
    const current = this.filter();
    return current.search?.trim() || current.joinDateFrom || current.joinDateTo;
  });

  activeFiltersCount = computed(() => {
    const current = this.filter();
    const searchCount = current.search?.trim() ? 1 : 0;
    const joinDateFromCount = current.joinDateFrom ? 1 : 0;
    const joinDateToCount = current.joinDateTo ? 1 : 0;

    return searchCount + joinDateFromCount + joinDateToCount;
  });

  performFilter$() {
    this.resetPagination();
    return this.store.getDashboardData(this.adaptedFilter());
  }

  clearAllFilters(): void {
    this.clearAll();
    this.applyFilter();
  }

  get FilterRequest(): IDashboardTableFilter {
    return this.filter();
  }

  applyFilterWithPaging(): void {
    this.updateFilterSignal();
    this.store.getDashboardData(this.adaptedFilter()).pipe(take(1)).subscribe();
  }

}
