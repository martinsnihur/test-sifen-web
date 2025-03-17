import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, finalize, of, tap } from 'rxjs';

/**
 * Interface for contact form data
 */
export interface ContactFormData {
  fullName: string;
  email: string;
  phone?: string;
  company?: string;
  subject: string;
  message: string;
}

/**
 * Interface for server response
 */
export interface ContactResponse {
  success: boolean;
  message: string;
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent implements OnInit {
  contactForm!: FormGroup;
  submitted = false;
  loading = false;
  success = false;
  errorMessage: string | null = null;
  formSubmitted = false;
  formSuccess = false;
  
  constructor(
    private fb: FormBuilder,
    private http: HttpClient
  ) {}
  
  ngOnInit(): void {
    this.initForm();
  }
  
  /**
   * Initialize the contact form with validators
   */
  private initForm(): void {
    this.contactForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [this.phoneValidator]],
      company: [''],
      subject: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      message: ['', [Validators.required, Validators.minLength(20), Validators.maxLength(1000)]],
      privacy: [false, Validators.requiredTrue]
    });
  }
  
  /**
   * Custom validator for phone numbers
   */
  private phoneValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) {
      return null; // Phone is optional
    }
    
    // Basic phone validation (can be enhanced for specific formats)
    const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
    return phoneRegex.test(value) ? null : { invalidPhone: true };
  }
  
  /**
   * Handle form submission
   */
  onSubmit(): void {
    this.submitted = true;
    
    if (this.contactForm.invalid) {
      return;
    }
    
    this.loading = true;
    this.errorMessage = null;
    
    const formData: ContactFormData = this.contactForm.value;
    
    // Replace with your actual API endpoint
    this.http.post<ContactResponse>('/api/contact', formData)
      .pipe(
        tap((response) => {
          this.success = response.success;
          if (!response.success) {
            this.errorMessage = response.message || 'Failed to send message. Please try again.';
          }
        }),
        catchError((error: HttpErrorResponse) => {
          this.success = false;
          this.errorMessage = error.error?.message || 'An unexpected error occurred. Please try again later.';
          return of({ success: false, message: this.errorMessage });
        }),
        finalize(() => {
          this.loading = false;
          if (this.success) {
            this.resetForm();
          }
        })
      )
      .subscribe();
  }
  
  /**
   * Reset the form after successful submission
   */
  public resetForm(): void {
    this.submitted = false;
    this.contactForm.reset();
    Object.keys(this.contactForm.controls).forEach(key => {
      const control = this.contactForm.get(key);
      control?.setErrors(null);
    });
    
    // Auto-clear success message after 5 seconds
    setTimeout(() => {
      this.success = false;
    }, 5000);
  }
  
  /**
   * Check if a field has errors and has been touched or submitted
   */
  hasError(controlName: string): boolean {
    const control = this.contactForm.get(controlName);
    return !!(control && control.invalid && (control.touched || this.submitted));
  }
  
  /**
   * Get error message for a specific field
   */
  getErrorMessage(controlName: string): string {
    const control = this.contactForm.get(controlName);
    
    if (!control || !control.errors) {
      return '';
    }
    
    if (control.errors['required']) {
      return 'This field is required';
    }
    
    if (control.errors['email']) {
      return 'Please enter a valid email address';
    }
    
    if (control.errors['minlength']) {
      return `Minimum length is ${control.errors['minlength'].requiredLength} characters`;
    }
    
    if (control.errors['maxlength']) {
      return `Maximum length is ${control.errors['maxlength'].requiredLength} characters`;
    }
    
    if (control.errors['invalidPhone']) {
      return 'Please enter a valid phone number';
    }
    
    return 'Invalid input';
  }

  get f() { return this.contactForm.controls; }
}
