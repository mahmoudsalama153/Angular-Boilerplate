import { Directive, Input, TemplateRef, inject } from '@angular/core';

@Directive({
  selector: '[appStepContent]',
  standalone: true,
})
export class StepContentDirective {
  templateRef = inject<TemplateRef<any>>(TemplateRef);

  private _stepNumber!: number;

  @Input() set appStepContent(value: number) {
    this._stepNumber = value;
  }

  get stepNumber(): number {
    return this._stepNumber;
  }
}
