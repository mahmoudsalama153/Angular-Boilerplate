import { computed, inject, Injectable, signal } from '@angular/core';
import { AbstractServiceFilter } from '../../../shared/classes/abstract-service-filter';
import { IDashboardTableFilter } from '../../../shared/interfaces/dashboard.interface';
import { DashboardFilter } from '../classes/dashboard-filter.class';
import { take } from 'rxjs';
import { DashboardStore } from '@app/features/dashboard/store/dashboard.store';

@Injectable()
export class DashboardFilterService extends AbstractServiceFilter<IDashboardTableFilter> {
  store = inject(DashboardStore);
  filterClass = new DashboardFilter();
  filter = signal(this.filterClass.filter);
  adaptedFilter = computed(() => {
    const filter = this.filter();
    return {
      ...filter,
      joinDateFrom: filter.joinDateFrom
        ? new Date(filter.joinDateFrom).toLocaleDateString('en-CA')
        : undefined,
      joinDateTo: filter.joinDateTo
        ? new Date(filter.joinDateTo).toLocaleDateString('en-CA')
        : undefined,
    };
  });

  showClearAll = computed(() => {
    const current = this.filter();
    return (
      current.search?.trim() ||
      current.joinDateFrom ||
      current.joinDateTo ||
      current.type?.length ||
      current.singleSelectExample ||
      current.submissionDate?.length
    );
  });

  activeFiltersCount = computed(() => {
    const current = this.filter();
    const searchCount = current.search?.trim() ? 1 : 0;
    const joinDateFromCount = current.joinDateFrom ? 1 : 0;
    const joinDateToCount = current.joinDateTo ? 1 : 0;
    const typeCount = current.type?.length ?? 0;
    const singleSelectCount = current.singleSelectExample ? 1 : 0;
    const submissionDateCount = current.submissionDate?.length === 2 ? 1 : 0;

    return (
      searchCount +
      joinDateFromCount +
      joinDateToCount +
      typeCount +
      singleSelectCount +
      submissionDateCount
    );
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
