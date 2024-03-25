import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdminLayoutComponent } from './shared/components/admin-layout/admin-layout.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { EditPageComponent } from './edit-page/edit-page.component';
import { SharedModule } from '../shared/shared.module';
import { AuthGuard } from './shared/services/auth.guard';
import { SearchPipe } from './shared/search.pipe';
import { AlertComponent } from './shared/components/alert/alert.component';
import { AlertService } from './shared/services/alert.service';
// import { RegisterPageComponent } from './register-page/register-page.component';

@NgModule({
  declarations: [
    AdminLayoutComponent,
    DashboardPageComponent,
    EditPageComponent,
    // RegisterPageComponent,
    AlertComponent
  ],
  exports: [RouterModule],
  providers: [AuthGuard, AlertService],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '', component: AdminLayoutComponent, children: [
          { path: '', redirectTo: '/admin/login', pathMatch: 'full' },
          {
            path: 'login', loadComponent: () => import('./login-page/login-page.component')
              .then(c => c.LoginPageComponent)
          },
          // {path: 'register', component: RegisterPageComponent},
          { path: 'dashboard', component: DashboardPageComponent, canMatch: [AuthGuard] },
          { path: 'create', loadComponent: () => import('./create-page/create-page.component').then(c => c.CreatePageComponent), canMatch: [AuthGuard] },
          { path: 'post/:id/edit', component: EditPageComponent, canMatch: [AuthGuard] }
        ]
      }
    ]),
    SearchPipe
  ]
})
export class AdminModule {

}
