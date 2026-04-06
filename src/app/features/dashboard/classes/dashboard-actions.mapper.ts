import { EDashboardActions } from '@app/shared/enums';
import { IActionMenuItem } from '@app/shared/interfaces/menu.interface';

type TActionDefinition = {
  labelKey: string;
  command?: IActionMenuItem<unknown, EDashboardActions>['command'];
};

export class DashboardActionsMapper {
  private _actionDefinitions: Record<EDashboardActions, TActionDefinition> = {
    [EDashboardActions.EDIT]: { labelKey: 'Edit' },
    [EDashboardActions.VIEW]: { labelKey: 'View Details' },
    [EDashboardActions.DELETE]: { labelKey: 'Delete' },
  };

  getActions(actions: EDashboardActions[]): IActionMenuItem<unknown, EDashboardActions>[] {
    return actions.map((type: EDashboardActions) => ({
      key: type,
      label: this._actionDefinitions[type]?.labelKey,
      command: this._actionDefinitions[type]?.command,
    }));
  }
}
