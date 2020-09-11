import { Component, OnInit, OnDestroy } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddExpenseComponent } from 'src/app/shared/components/add-expense/add-expense.component';
import { DataService } from 'src/app/services/data/data.service';
import { ExpenseInterface } from 'src/app/interface/expenseInterface';
import { SubscriptionLike, BehaviorSubject } from 'rxjs';
import { ActionService } from 'src/app/services/action/action.service';
import { DatetimeService } from 'src/app/services/datetime/datetime.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {

  expenses : ExpenseInterface[];
  subscription: SubscriptionLike;  
  installDate: Date;
  selectedDate: Date;
  dateSubscription: SubscriptionLike; 

  constructor(
    private modalController:ModalController, 
    private dataService: DataService,
    private actionService: ActionService,
    private dateTimeService: DatetimeService
  ) { 
    this.actionService.getTodayExpensesFromLocal().then((expenses) => {
      this.expenses = expenses;
    })
    
    this.installDate = this.dateTimeService.installDate;

  }

  ngOnInit() {
    this.dateSubscription = this.dateTimeService.getSelectedDateSubscription()
      .subscribe({
        next: (date: Date) => {
          this.selectedDate = date;
        },
        error: (err) => {
          console.log(err);
        },
        complete: () => {}
      })
    this.subscription = this.dataService.getExpensesSubscription()
      .subscribe( {
        next: (expense: ExpenseInterface[]) => {          
          if (expense != null) {
            this.expenses = expense;
          }          
          else {
            this.expenses = [];
          }
        },
        error: (err) => {
          console.log(err);          
        },
        complete: () => {}
      });
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: AddExpenseComponent,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }

  ngOnDestroy(): void {
  }

  changeSelectedDate(value: string) : void {    
    this.selectedDate = this.dateTimeService.createDateFromString(value);
    this.dateTimeService.setSelectedDate(value).then(() => {
      this.actionService.emitExpensesByDateFromLocal(this.selectedDate);
    });
  }

  setCurrentToTodayDate(): void {            
    this.dateTimeService.setSelectedDate(this.dateTimeService.getCurrentDateTime()).then(() => {
      this.actionService.emitExpensesByDateFromLocal(this.selectedDate);
    });
  }

}
