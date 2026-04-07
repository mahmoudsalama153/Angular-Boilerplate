import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { TableLayoutComponent } from '../../../../shared/components/layout-components/table-layout/table-layout.component';
import { DataTableComponent } from '../../../../shared/components/layout-components/data-table/data-table.component';
import { TableSkeletonComponent } from '../../../../shared/components/skeletons/table-skeleton/table-skeleton.component';
import { ITableHeaderItem } from '../../../../shared/interfaces';
import { DashboardFilterService } from '../../services/dashboard-filter.service';
import { LocalizedDatePipe } from '../../../../core/pipes/localized-date.pipe';
import { DashboardActionsMenu } from '../../components/dashboard-actions-menu/dashboard-actions-menu';
import { BaseTagComponent } from '@app/shared/components/base-components/base-tag/base-tag.component';
import { DashboardStatus } from '@app/features/dashboard/classes/dashboard-status';
import { DashboardFilter } from '../../components/dashboard-filter/dashboard-filter';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [
    TableLayoutComponent,
    DataTableComponent,
    TableSkeletonComponent,
    LocalizedDatePipe,
    DashboardActionsMenu,
    BaseTagComponent,
    DashboardFilter,
  ],
  templateUrl: './dashboard-page.html',
  styleUrl: './dashboard-page.scss',
  providers: [DashboardFilterService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardPage extends DashboardStatus {
  isLoading = signal<boolean>(false);
  totalRecords = signal<number>(20);
  page = signal<number>(1);
  pageSize = signal<number>(10);
  totalPages = computed(() => Math.ceil(this.totalRecords() / this.pageSize()));

  readonly headers = computed<ITableHeaderItem<unknown>[]>(() => {
    const baseHeaders: ITableHeaderItem<unknown>[] = [
      { label: 'Id', isSortable: true, sortingKey: 'planCode' },
      { label: 'Investor', isSortable: true, sortingKey: 'investorName' },
      { label: 'Title', isSortable: false, sortingKey: 'title' },
      { label: 'Type', isSortable: false, sortingKey: 'planType' },
      { label: 'Submission Date', isSortable: true, sortingKey: 'submissionDate' },
      { label: 'Assignee', isSortable: false, sortingKey: 'assignedEmployee' },
      { label: 'Current Status', isSortable: false, sortingKey: 'status' },
      { label: 'Actions', isSortable: false },
    ];

    return baseHeaders;
  });

  rows = signal<unknown[]>([
    {
      id: 'a636b7d0-c8ae-427b-b98c-f034327d47ea',
      planCode: 10019,
      title:
        'Eiusmod labore suscipit quia consequatur expedita magni sed deleniti suscipit dolorum rerum eum aut eu voluptate aut vel impedit',
      planType: 2,
      submissionDate: '2026-03-12T13:44:24.4779737',
      status: 2,
      planStatus: 6,
      slaCountDown: -1,
      slaFinalActionCount: null,
      actions: [1, 2, 3],
      slaStartDate: '2026-03-15',
      investorName: 'amr',
      assignedEmployee: 'AHMED ABDULMAJEED ALGHAMDI',
      employeeStatus: 2,
      opportunityId: '4aff07ed-da4c-4292-84c9-ca72a05c96fb',
    },
    {
      id: '1a3677e5-76a7-4692-adf5-3a3304bcee34',
      planCode: 10017,
      title: 'amr new',
      planType: 1,
      submissionDate: '2026-03-11T10:25:48.1681124',
      status: 10,
      planStatus: 4,
      slaCountDown: null,
      slaFinalActionCount: null,
      actions: [1, 2, 3],
      slaStartDate: null,
      investorName: 'amr',
      assignedEmployee: 'AHMED ABDULMAJEED ALGHAMDI',
      employeeStatus: 10,
      opportunityId: 'a7e552cc-8cd1-410b-a5b6-b86cfcad32eb',
    },
  ]);

  filterService = inject(DashboardFilterService);
  applyFilter = () => {
    this.isLoading.set(true);
    this.totalRecords.set(this.rows().length);
    this.isLoading.set(false);
  };
}
