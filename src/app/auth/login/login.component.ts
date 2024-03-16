import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CardModule, InputTextModule, ButtonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private messageService = inject(MessageService);

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  })


  get email() {
    return this.loginForm.controls['email']
  }

  get password() {
    return this.loginForm.controls['password']
  }


  loginUser() {
    const { email, password } = this.loginForm.value;
    this.authService.getUserByEmail(email as string).subscribe(
      response => {
        if(response.length > 0 && response[0].password === password){
          localStorage.setItem('testUser', email as string);
          this.router.navigate(['/home'])
        }else{
          this.messageService.add({severity: 'error', summary: 'Error', detail: 'Email or password wrong'});
        }
      },
      error => {
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'Something went wrong'});
      }
    )
  }


}
