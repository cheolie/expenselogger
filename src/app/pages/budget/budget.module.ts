import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BudgetComponent } from './budget.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path:'', component: BudgetComponent}
];


@NgModule({
  declarations: [BudgetComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class BudgetModule { }
