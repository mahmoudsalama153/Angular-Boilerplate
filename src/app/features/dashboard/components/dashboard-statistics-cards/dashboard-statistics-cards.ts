import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Interface for statistics card configuration
 */
interface IStatisticsCard {
  title: string;
  value: number;
}

@Component({
  selector: 'app-dashboard-statistics-cards',
  templateUrl: './dashboard-statistics-cards.html',
  styleUrl: './dashboard-statistics-cards.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardStatisticsCards {
  readonly cards: IStatisticsCard[] = [
    {
      title: 'Total Plans',
      value: 128,
    },
    {
      title: 'Unassigned Plans',
      value: 22,
    },
    {
      title: 'Plans Under Review',
      value: 34,
    },
    {
      title: 'Approved Plans',
      value: 58,
    },
  ];
}
