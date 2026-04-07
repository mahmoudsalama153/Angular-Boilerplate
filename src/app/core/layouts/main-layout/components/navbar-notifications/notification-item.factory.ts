import {
  INotification,
  INotificationItem,
  INotificationParams,
  NotificationBehavior,
} from '../../models/notifications.interface';

class BaseNotificationParams {
  route: string[] = [];
  params: Record<string, string> = {};
  behavior: NotificationBehavior = null;
}

export class NotificationItemFactory {
  static create(notification: INotification): INotificationItem {
    const internalUser = new InternalUserNotificationParams(notification);

    return {
      ...notification,
      route: internalUser.route,
      params: internalUser.params,
      behavior: internalUser.behavior,
    } as INotificationItem;
  }
}

class InternalUserNotificationParams extends BaseNotificationParams {
  constructor(notification: INotification) {
    super();
    const built = buildParams(notification);
    this.route = built.route;
    this.params = built.params;
    this.behavior = built.behavior;
  }
}

function buildParams(notification: INotification): INotificationParams {
  return { route: [], params: {}, behavior: null };
}
