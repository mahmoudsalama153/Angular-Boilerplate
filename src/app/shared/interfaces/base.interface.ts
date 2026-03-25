type ValidationMessageKey =
  | 'expectedLength'
  | 'required'
  | 'maxlength'
  | 'minlength'
  | 'max'
  | 'min'
  | 'inComplete'
  | 'totalExceeds100'
  | 'invalidPhoneNumber'
  | 'email'
  | 'alphabetsAndSpacesOnly'
  | 'invalidJobTitle'
  | 'invalidContactNumber'
  | 'passwordMismatch'
  | 'fileSizeExceeded'
  | 'dateRangeInvalid'
  | 'minQuantityError'
  | 'maxQuantityError'
  | 'invalidRegisteredVendorIDLength';

export type TColors = 'red' | 'blue' | 'green' | 'yellow' | 'indigo' | 'purple' | 'pink' | 'gray' | 'orange' | 'primary' | 'fadedBlue' | 'fadeGreen' | 'cloudBlue';

export interface ITableHeaderItem<T> {
  label: string;
  isSortable: boolean;
  sortingKey?: T;
  tooltip?: string;
}

export type TDialogPosition = 'center' | 'top' | 'bottom' | 'left' | 'right';

export type TPrimeSeverity = 'primary' | 'secondary' | 'success' | 'info' | 'danger' | 'help';
