import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
@Component({
  selector: 'app-identify-user',
  imports: [AvatarModule],
  templateUrl: './identify-user.component.html',
  styleUrl: './identify-user.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IdentifyUserComponent {
  userAvatar = input<string | null | undefined>('assets/images/user_placeholder.svg');
  avatarClass = input<string>('!w-[40px] !h-[40px]');
  titleClass = input<string>('font-medium text-(--p-text-primary)');
  subTitleClass = input<string>('text-sm font-normal text-(--p-text-tertiary)');
  departmentClass = input<string>('text-sm font-normal text-(--p-text-tertiary)');
  roleClass = input<string>('text-sm font-normal text-(--p-text-tertiary)');

  userName = input<string>('User User');
  userTitle = input<string>('');
  userDepartment = input<string>('');
  userRole = input<string | number>('');

  readonly userRoleText = computed(() => {
    const raw = this.userRole();
    if (raw === null || raw === undefined) return '';
    const text = String(raw).trim();
    if (!text) return '';
    return text;
  });
}
