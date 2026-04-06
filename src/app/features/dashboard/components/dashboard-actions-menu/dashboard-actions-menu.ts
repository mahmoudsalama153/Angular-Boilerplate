import { Component, ChangeDetectionStrategy, computed, input, output } from '@angular/core';
import { EDashboardActions } from '../../../../shared/enums';
import { MenuItem } from 'primeng/api';
import { Button } from 'primeng/button';
import { Menu } from 'primeng/menu';
import { DashboardActionsMapper } from '@app/features/dashboard/classes/dashboard-actions.mapper';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-dashboard-actions-menu',
  imports: [Button, Menu],
  templateUrl: './dashboard-actions-menu.html',
  styleUrl: './dashboard-actions-menu.scss',
})
export class DashboardActionsMenu {
  actions = input.required<EDashboardActions[]>();
  element = input.required<unknown>();
  private readonly actionsMapper = new DashboardActionsMapper();

  // Outputs for each action
  readonly onEdit = output<unknown>();
  readonly onView = output<unknown>();
  readonly onDelete = output<unknown>();

  handleEventsMapper: Partial<Record<EDashboardActions, ReturnType<typeof output>>> = {
    [EDashboardActions.EDIT]: this.onEdit,
    [EDashboardActions.VIEW]: this.onView,
    [EDashboardActions.DELETE]: this.onDelete,
  };

  menuItems = computed<MenuItem[]>(() => {
    const element = this.element();
    return this.actionsMapper.getActions(this.actions()).map((mItem) => {
      return {
        ...mItem,
        command: () => {
          this.handleEventsMapper[mItem.key]?.emit(element);
        },
      };
    });
  });
}
