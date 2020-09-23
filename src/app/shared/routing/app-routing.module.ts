import { NgModule } from '@angular/core';
// Required services for navigation
import { Routes, RouterModule } from '@angular/router';


// Import all the components for which navigation service has to be activated 

import { AuthGuard } from '../guard/auth.guard';
import { SecureGuard } from '../guard/secure.guard';
import { PrincipalComponent } from 'src/app/components/body/principal/principal.component';
import { AdminComponent } from 'src/app/components/admin/admin.component';

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: '', component: PrincipalComponent },
  { path: 'admin', component: AdminComponent},
 /* { path: 'sign-in', component: SignInComponent, canActivate: [SecureGuard] },
  { path: 'register-user', component: SignUpComponent, canActivate: [SecureGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  { path: 'forgot-password', component: ForgotPasswordComponent, canActivate: [SecureGuard] },
  { path: 'verify-email-address', component: VerifyEmailComponent, canActivate: [SecureGuard] }*/
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}