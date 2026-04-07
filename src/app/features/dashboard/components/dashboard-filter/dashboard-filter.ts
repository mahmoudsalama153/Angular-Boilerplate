import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  inject,
  OnInit,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { DashboardFilterService } from '@app/features/dashboard/services/dashboard-filter.service';
import { I18nService } from '@app/shared/services/i18n';
import { Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { MultiSelect } from 'primeng/multiselect';
import { DatePicker } from 'primeng/datepicker';
import { OverlayBadge } from 'primeng/overlaybadge';
import { Button } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { InputText } from 'primeng/inputtext';
import { Select } from 'primeng/select';
import { DashboardStore } from '@app/features/dashboard/store/dashboard.store';

interface IDropdownOption {
  label: string;
  value: string;
}

@Component({
  selector: 'app-dashboard-filter',
  imports: [MultiSelect, DatePicker, OverlayBadge, Button, FormsModule, InputText, Select],
  templateUrl: './dashboard-filter.html',
  styleUrl: './dashboard-filter.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardFilter implements OnInit {
  readonly filterService = inject(DashboardFilterService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly searchSubject = new Subject<string>();
  readonly maxSubmissionDate = new Date();
  private readonly i18nService = inject(I18nService);
  private readonly route = inject(ActivatedRoute);
  private readonly dashboardStore = inject(DashboardStore);
  readonly filter = this.filterService.filter;
  selectedSingleExample: string | null = null;

  multiSelectDropdownExample = computed(() => {
    return this.dashboardStore.multiSelectDropdownExample() as IDropdownOption[];
  });

  singleSelectDropdownExample = computed(() => {
    return this.dashboardStore.singleSelectDropdownExample() as IDropdownOption[];
  });

  ngOnInit() {
    this.listenToSearchChanges();
    this.listenToQueryParamChanges();
  }

  private listenToQueryParamChanges() {
    this.route.queryParams.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((queryParams) => {
      const updates: Record<string, string> = {};

      if (queryParams['searchText']) {
        updates['searchText'] = queryParams['searchText'];
      } else {
        updates['searchText'] = '';
      }

      if (Object.keys(updates).length > 0) {
        this.filterService.updateFilterSignal({ ...updates, pageNumber: 1 });
        this.filterService.applyFilterWithPaging();
      } else {
        this.filterService.applyFilterWithPaging();
      }
    });
  }

  onSearchTextChange(_value: string) {
    // this.filterService.updateFilterSignal({ searchText: value, pageNumber: 1 });
    // this.searchSubject.next(value ?? '');
  }

  onPickerChange(_value: Date[] | undefined) {
    // value = value?.filter((x) => !!x) ?? [];
    // if (!!value && (value.length === 2 || value.length === 0)) {
    //   this.filterService.updateFilterSignal({ submissionDate: value.length === 2 ? value : undefined, pageNumber: 1 });
    //   this.filterService.applyFilterWithPaging();
    // }
  }

  onClearFilters() {
    this.onSearchTextChange('');
    this.filterService.clearAllFilters();
    // this.filterService.updateFilterSignal({ searchText: '' });
  }

  private listenToSearchChanges() {
    this.searchSubject
      .pipe(
        debounceTime(700),
        distinctUntilChanged(),
        switchMap(() => this.filterService.performFilter$()),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe();
  }
}
