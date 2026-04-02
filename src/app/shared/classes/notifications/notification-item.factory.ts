import { INotification, INotificationItem, INotificationParams, NotificationBehavior } from "../../../core/layouts/main-layout/models/notifications.interface";
import { ERoles } from "../../enums";
import { safeJsonParse } from "../../utlities/safe-parse-json";


class BaseNotificationParams {
  route: string[] = [];
  params: Record<string, string> = {};
  behavior: NotificationBehavior = null;
}

export class NotificationItemFactory {
  static create(notification: INotification, userRole: ERoles): INotificationItem {

    notification = { ...notification, customData: safeJsonParse(notification.customData) }

    const internalUsersRoles: ERoles[] = [
      ERoles.EMPLOYEE,
      ERoles.ADMIN
    ];

    // internal roles
    if (internalUsersRoles.includes(userRole)) {
      const internalUser = new InternalUserNotificationParams(notification);
      return {
        ...notification,
        route: internalUser.route,
        params: internalUser.params,
        behavior: internalUser.behavior,
      } as INotificationItem;
    }


    // fallback for others
    return {
      ...notification,
      route: [],
      params: {},
      behavior: null,
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

class InvestorNotificationParams extends BaseNotificationParams {
  constructor(notification: INotification) {
    super();
    const built = buildParams(notification);
    this.route = built.route;
    this.params = built.params;
    this.behavior = built.behavior;
  }
}

function buildParams(notification: INotification): INotificationParams {

  // if (notification.notificationCategory === ENotificationCategory.PlanWorkflow) {
  //   return handlePlansNotificationFlow(notification)
  // }

  // if (notification.notificationCategory === ENotificationCategory.Opportunity) {
  //   return handleOpportunityNotificationFlow(notification)
  // }

  return { route: [], params: {}, behavior: null }

}

/* create function to handel notification based on category */
function handlePlansNotificationFlow(notification: INotification) {
  const searchText = notification.customData?.PlanCode || '';
  // const action = notification.action as EPlanAction;

  const baseNavigationConfig = {
    route: [],
    params: { searchText },
    behavior: null,
  };

  return baseNavigationConfig
}

function handleOpportunityNotificationFlow(notification: INotification) {
  const opportunityId = notification.customData?.Id || '';
  // const action = notification.action as EOpportunityAction | ENotificationType;

  const baseNavigationConfig = {
    route: [],
    params: {},
    behavior: null,
  };
  return baseNavigationConfig
}


