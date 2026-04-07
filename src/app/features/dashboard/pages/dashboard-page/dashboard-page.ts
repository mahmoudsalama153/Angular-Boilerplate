import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { TableLayoutComponent } from '../../../../shared/components/layout-components/table-layout/table-layout.component';
import { DataTableComponent } from '../../../../shared/components/layout-components/data-table/data-table.component';
import { TableSkeletonComponent } from '../../../../shared/components/skeletons/table-skeleton/table-skeleton.component';
import { ITableHeaderItem, TDashboardTableKeys } from '../../../../shared/interfaces';
import { LocalizedDatePipe } from '../../../../shared/pipes/localized-date.pipe';
import { DashboardActionsMenu } from '../../components/dashboard-actions-menu/dashboard-actions-menu';
import { DashboardStatus } from '@app/features/dashboard/classes/dashboard-status';
import { DashboardFilter } from '../../components/dashboard-filter/dashboard-filter';
import { BaseTagComponent } from '@app/shared/components/base-components/base-tag/base-tag.component';
import { DashboardFilterService } from '../../services/dashboard-filter.service';
import { DashboardStore } from '../../store/dashboard.store';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [
    TableLayoutComponent,
    DataTableComponent,
    TableSkeletonComponent,
    LocalizedDatePipe,
    DashboardActionsMenu,
    DashboardFilter,
    BaseTagComponent
  ],
  templateUrl: './dashboard-page.html',
  styleUrl: './dashboard-page.scss',
  providers: [DashboardFilterService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardPage extends DashboardStatus {
  filterService = inject(DashboardFilterService, {
    self: true  // to get only the instance provided in this page
  });
  dashboardStore = inject(DashboardStore)
  isLoading = signal<boolean>(false);
  totalRecords = signal<number>(20);
  page = signal<number>(1);
  pageSize = signal<number>(10);
  totalPages = computed(() => Math.ceil(this.totalRecords() / this.pageSize()));

  readonly headers = computed<ITableHeaderItem<TDashboardTableKeys>[]>(() => {
    const baseHeaders: ITableHeaderItem<TDashboardTableKeys>[] = [
      { label: 'Id', isSortable: true, sortingKey: 'id' },
      { label: 'Investor', isSortable: true, sortingKey: 'name' },
      { label: 'Title', isSortable: false, sortingKey: 'title' },
      { label: 'Type', isSortable: false, sortingKey: 'type' },
      { label: 'Join Date', isSortable: true, sortingKey: 'joinDate' },
      { label: 'Assignee', isSortable: false, sortingKey: 'assignedEmployee' },
      { label: 'Current Status', isSortable: false, sortingKey: 'status' },
      { label: 'Actions', isSortable: false },
    ];

    return baseHeaders;
  });

  rows = this.dashboardStore.list;

  applyFilter() {
    this.filterService.applyFilter();
  }
}
