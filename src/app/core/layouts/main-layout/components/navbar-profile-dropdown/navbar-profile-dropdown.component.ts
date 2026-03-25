import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PopoverModule } from 'primeng/popover';
import { AvatarModule } from 'primeng/avatar';
import { DividerModule } from 'primeng/divider';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SkeletonModule } from 'primeng/skeleton';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navbar-profile-dropdown',
  imports: [
    FormsModule,
    PopoverModule,
    AvatarModule,
    DividerModule,
    RadioButtonModule,
    SkeletonModule,
  ],
  templateUrl: './navbar-profile-dropdown.component.html',
  styleUrl: './navbar-profile-dropdown.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarProfileDropdownComponent {

}
