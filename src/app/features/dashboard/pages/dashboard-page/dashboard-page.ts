import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { TableLayoutComponent } from '../../../../shared/components/layout-components/table-layout/table-layout.component';
import { DataTableComponent } from '../../../../shared/components/layout-components/data-table/data-table.component';
import { BaseTagComponent } from '../../../../shared/components/base-components/base-tag/base-tag.component';
import { TableSkeletonComponent } from '../../../../shared/components/skeletons/table-skeleton/table-skeleton.component';
import { ITableHeaderItem } from '../../../../shared/interfaces';
import { DashboardFilterService } from '../../services/dashboard-filter/dashboard-filter.service';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [
    TableLayoutComponent,
    DataTableComponent,
    BaseTagComponent,
    TableSkeletonComponent
  ],
  templateUrl: './dashboard-page.html',
  styleUrl: './dashboard-page.scss',
  providers: [DashboardFilterService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardPage {
  isLoading = signal<boolean>(false);
  totalRecords = signal<number>(0);
  page = signal<number>(1);
  pageSize = signal<number>(10);
  totalPages = computed(() => Math.ceil(this.totalRecords() / this.pageSize()));
  headers = signal<ITableHeaderItem<unknown>[]>([
    {
      label: 'Name',
      sortingKey: 'name',
      isSortable: true
    },
    {
      label: 'Email',
      sortingKey: 'email',
      isSortable: true
    },
    {
      label: 'Join Date',
      sortingKey: 'joinDate',
      isSortable: true
    },
    {
      label: 'Actions',
      isSortable: false
    }
  ])

  rows = signal<unknown[]>([
    {
      name: 'John Doe',
      email: 'john.doe@example.com'
    },
    {
      name: 'Jane Doe',
      email: 'jane.doe@example.com'
    }
  ])

  filterService = inject(DashboardFilterService);
  applyFilter = () => {
    this.isLoading.set(true);
    this.totalRecords.set(this.rows().length);
    this.isLoading.set(false);
  }
}
