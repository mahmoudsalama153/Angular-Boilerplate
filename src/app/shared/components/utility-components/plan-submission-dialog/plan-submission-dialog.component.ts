import { ChangeDetectionStrategy, Component, computed, input, model, output, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { BaseDialogComponent } from '../../base-components/base-dialog/base-dialog.component';
import { BaseLabelComponent } from '../../base-components/base-label/base-label.component';
import { FormInputErrorMessages } from '../form-input-error-messages/form-input-error-messages';
import { SignaturePadComponent } from '../../form/signature-pad/signature-pad.component';

export interface PlanSubmissionDialogValue {
  name: string;
  jobTitle: string;
  contactNumber: string;
  email: string;
  signature: string | null;
}

@Component({
  selector: 'app-plan-submission-dialog',
  imports: [
    BaseDialogComponent,
    ReactiveFormsModule,
    InputTextModule,
    BaseLabelComponent,
    FormInputErrorMessages,
    SignaturePadComponent,
  ],
  templateUrl: './plan-submission-dialog.component.html',
  styleUrl: './plan-submission-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanSubmissionDialogComponent {
  visible = model(false);
  isLoading = input(false);

  title = input<string>('Are you sure you want to submit this plan?');
  description = input<string>(
    'I hereby confirm that I have thoroughly reviewed this document and acknowledge that the approval of this localization plan does not constitute, nor imply, any guarantee of current or future business with SEC or any of its approved suppliers. I further affirm that all information provided within this plan (including all sections) is, to the best of my knowledge, true, accurate, and complete. I understand that failure to comply with the submitted timeline may result in the revocation of my qualification by SEC at any time',
  );

  submitLabel = input<string>('Submit');
  backLabel = input<string>('Back');

  submitted = output<PlanSubmissionDialogValue>();
  backed = output();
  closed = output();

  form = new FormGroup({
    name: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    jobTitle: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    contactNumber: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    email: new FormControl<string>('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    signature: new FormControl<string | null>(null, { validators: [Validators.required] }),
  });

  private lastSignature = signal<string | null>(null);
  existingSignature = computed(() => this.lastSignature());

  onSignatureChange(signature: string | null) {
    this.lastSignature.set(signature);
    this.form.controls.signature.setValue(signature);
    this.form.controls.signature.markAsTouched();
  }

  handleBack() {
    this.backed.emit();
  }

  handleClose() {
    this.closed.emit();
  }

  handleSubmit() {
    this.form.markAllAsTouched();
    if (this.form.invalid) return;
    this.submitted.emit(this.form.getRawValue() as PlanSubmissionDialogValue);
  }
}

