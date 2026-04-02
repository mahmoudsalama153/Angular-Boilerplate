import { Filter } from "../../../shared/classes/filter";
import { Pagination } from "../../../shared/classes/pagination";
import { Sorting } from "../../../shared/classes/sorting";
import { ESortingOrder } from "../../../shared/enums";
import { IDashboardTableFilter, TDashboardTableKeys } from "../../../shared/interfaces";


export class DashboardFilter extends Filter<IDashboardTableFilter, TDashboardTableKeys> {
  constructor() {
    super();

    const pagination = new Pagination(10);
    const sorting = new Sorting<TDashboardTableKeys>();
    sorting.sortField = 'joinDate';
    sorting.sortOrder = ESortingOrder.desc;

    this.filter = {
      ...pagination,
      ...sorting,
      search: '',
      joinDateFrom: undefined,
      joinDateTo: undefined,
    };

    this.initialState = structuredClone(this.filter);
  }

  clearFilter(filter?: Partial<IDashboardTableFilter> | undefined): void {
    this.filter = structuredClone({
      ...this.initialState,
      ...(filter ? filter : {}),
    });
  }
}

