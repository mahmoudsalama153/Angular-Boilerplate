import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardActionsMenu } from './dashboard-actions-menu';

describe('DashboardActionsMenu', () => {
  let component: DashboardActionsMenu;
  let fixture: ComponentFixture<DashboardActionsMenu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardActionsMenu],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardActionsMenu);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
