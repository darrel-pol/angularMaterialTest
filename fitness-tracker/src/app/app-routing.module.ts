import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { AuthGuard } from './auth/auth.guard';
import { TrainingComponent } from './training/training/training.component';

const routes: Routes = [
  {path: '', component: WelcomeComponent},
  //  {path: 'training', loadChildren: "./training/training/training.module#TrainingModule"},
  // unable to solve problem probaly because of cli version.
  // Don't wanna waste time to solve this.
  //  Will use lazy loading on the next project
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
