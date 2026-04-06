export type TColors =
  | 'red'
  | 'blue'
  | 'green'
  | 'yellow'
  | 'indigo'
  | 'purple'
  | 'pink'
  | 'gray'
  | 'orange'
  | 'primary'
  | 'fadedBlue'
  | 'fadeGreen'
  | 'cloudBlue';

export interface IStatus {
  getStatusLabel(status: number): string;
  getStatusLabelKey(status: number): string;
  getStatusBadgeClass(status: number): TColors;
}
