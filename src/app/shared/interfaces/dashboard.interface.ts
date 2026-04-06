import { EDashboardActions } from '../enums';
import { IFilterBase } from './filter.interface';

export interface IDashboardRecord {
  id: string;
  name: string;
  email: string;
  joinDate: string;
  status: string;
  actions: EDashboardActions[];
}

export type TDashboardTableKeys = keyof IDashboardRecord;

export interface IDashboardTableFilter extends IFilterBase<TDashboardTableKeys> {
  search?: string;
  joinDateFrom?: string;
  joinDateTo?: string;
  type?: string | null;
  submissionDate?: string | null;
}
