import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivityComponent } from './activity.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path:'', component: ActivityComponent}
];



@NgModule({
  declarations: [ActivityComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ActivityModule { }
