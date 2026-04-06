import { inject, Injectable } from '@angular/core';
import { EDashboardActions } from '@app/shared/enums';
import { IStatus, TColors } from '@app/shared/interfaces/status.interface';
import { I18nService } from '@app/shared/services/i18n';

@Injectable({
  providedIn: 'root',
})
export class DashboardStatus implements IStatus {
  i18nService = inject(I18nService);

  private readonly statusKeyMap: Record<EDashboardActions, string> = {
    [EDashboardActions.DELETE]: 'Deleted',
    [EDashboardActions.EDIT]: 'Edited',
    [EDashboardActions.VIEW]: 'Viewed',
  };

  getStatusLabel(status: EDashboardActions): string {
    return this.i18nService.translate(this.getStatusLabelKey(status));
  }

  getStatusLabelKey(status: EDashboardActions): string {
    return this.statusKeyMap[status] ?? 'Submitted';
  }

  getStatusBadgeClass(status: EDashboardActions): TColors {
    const classMap: Record<EDashboardActions, TColors> = {
      [EDashboardActions.DELETE]: 'red',
      [EDashboardActions.EDIT]: 'blue',
      [EDashboardActions.VIEW]: 'green',
    };
    return classMap[status] || classMap[EDashboardActions.VIEW];
  }
}
