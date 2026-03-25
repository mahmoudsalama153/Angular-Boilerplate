

export interface INotification {
  actionURL: string;
  body: string;
  createdDate: string;
  customData: {
    PlanId: string,
    PlanType: number,
    PlanCode: string,
    Id: string
  };
  from: string;
  id: string;
  isRead: boolean;
  readDate: string | null;
  title: string;
  to: string;
}

export interface INotificationItem extends INotification {
  route?: string[];
  params?: Record<string, string>;
  behavior: NotificationBehavior;
}

export interface INotificationParams {
  route: string[], params: Record<string, string>, behavior: NotificationBehavior
}

export type NotificationBehavior = 'planDetails' | null;

