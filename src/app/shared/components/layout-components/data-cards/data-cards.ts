import { ChangeDetectionStrategy, Component, contentChild, inject, input, model, TemplateRef } from '@angular/core';
import { PaginatorComponent } from '../../utility-components/paginator/paginator.component';
import { EmptyRecordsComponent } from '../../utility-components/empty-records/empty-records.component';
import { NgTemplateOutlet } from '@angular/common';
import { IFilterBase } from '../../../interfaces';
import { I18nService } from '../../../services/i18n';


@Component({
  selector: 'app-data-cards',
  imports: [PaginatorComponent, EmptyRecordsComponent, NgTemplateOutlet],
  templateUrl: './data-cards.html',
  styleUrl: './data-cards.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataCards {
  totalRecords = input.required<number>();
  itemsTemplate = contentChild.required<TemplateRef<unknown>>("itemsTemplate");
  items = input.required<unknown[]>();
  isLoading = input<boolean>(false);
  filter = model.required<IFilterBase<unknown>>();
  private readonly i18nService = inject(I18nService);
  messageTitle = input<string>(this.i18nService.translate('common.noDataFound'));
}
