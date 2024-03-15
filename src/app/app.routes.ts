import { Routes } from '@angular/router';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { authGuard } from './auth/auth.guard';

const appname = 'ANG'

export const routes: Routes = [
    { path: 'welcome', title: `${appname} - Welcome`, component: WelcomeComponent },
    {
        path: 'test', title: `${appname} -Tests`, canActivate: [authGuard],
        loadChildren: () => import('./pages/tests/tests.routes').then(r => r.TEST_ROUTES)
    },
    {
        path: 'login', title: `${appname} - Login`,
        loadComponent: () => import('./auth/login/login.component').then(c => c.LoginComponent)
    },
    { path: '', redirectTo: 'welcome', pathMatch: 'full' },
    { path: '**', redirectTo: '/', pathMatch: 'full' }
];
