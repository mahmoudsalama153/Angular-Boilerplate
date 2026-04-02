import { IFilterBase } from "./filter.interface";

export interface IDashboardRecord {
  id: string;
  name: string;
  email: string;
  joinDate: string
}

export type TDashboardTableKeys = keyof IDashboardRecord;

export interface IDashboardTableFilter extends IFilterBase<TDashboardTableKeys> {
  search?: string;
  joinDateFrom?: string;
  joinDateTo?: string;
}