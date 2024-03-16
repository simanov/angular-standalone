import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { passwordMatchValidator } from '../../shared/password-match.directive';
import { AuthService } from '../auth.service';
import { User } from '../interfaces/user';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CardModule, InputTextModule, ButtonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  private fb = inject(FormBuilder)
  private authService = inject(AuthService);
  private router = inject(Router);
  private messageService = inject(MessageService);

  registerForm = this.fb.group({
    fullName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required]
  }, { validators: passwordMatchValidator })




  get fullName() {
    return this.registerForm.controls['fullName']
  }

  get email() {
    return this.registerForm.controls['email']
  }

  get password() {
    return this.registerForm.controls['password']
  }

  get confirmPassword() {
    return this.registerForm.controls['confirmPassword']
  }


  submitDetails() {
    const postData = { ...this.registerForm.value };
    delete postData.confirmPassword;
    this.authService.registerUser(postData as User).subscribe(
      response => {
        this.messageService.add({severity: 'success', summary: 'Success', detail: 'Register successfully'});
        this.router.navigate(['login']);
      },
      error => {
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'Something went wrong'});
      }
    );
  }


}
