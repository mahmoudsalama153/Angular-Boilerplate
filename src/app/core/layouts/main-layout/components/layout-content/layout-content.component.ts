import { ChangeDetectionStrategy, Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";


@Component({
	selector: "app-layout-content",
	imports: [RouterOutlet],
	templateUrl: "./layout-content.component.html",
	styleUrl: "./layout-content.component.scss",
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutContentComponent { }
