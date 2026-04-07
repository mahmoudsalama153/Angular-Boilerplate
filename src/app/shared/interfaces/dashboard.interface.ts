import { EDashboardActions, EDashboardStatus, EDashboardTypes } from '../enums';
import { IFilterBase } from './filter.interface';

export interface IDashboardRecord {
  id: string;
  name: string;
  email: string;
  joinDate: string;
  assignedEmployee: string;
  title: string;
  type: EDashboardTypes;
  status: EDashboardStatus;
  actions: EDashboardActions[];
}

export type TDashboardTableKeys = keyof IDashboardRecord;

export interface IDashboardTableFilter extends IFilterBase<TDashboardTableKeys> {
  search?: string;
  joinDateFrom?: string;
  joinDateTo?: string;
  type?: string[] | null;
  singleSelectExample?: string | null;
  submissionDate?: Date[] | null;
}
