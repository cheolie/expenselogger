import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatetimeService {

  private _installDate: Date;  
  private _selectedDate: BehaviorSubject<Date>;

  constructor() { 
    this._selectedDate = new BehaviorSubject<Date>(this.getCurrentDateTime());    
  }

  async setSelectedDate(date: Date | string): Promise<void> {    
    return this._selectedDate.next(typeof date == "string" ? this.createDateFromString(date) : date);
  }

  async getSelectedDate(): Promise<Date> {
    return this._selectedDate.getValue();
  }

  getSelectedDateSubscription(): BehaviorSubject<Date> {
    return this._selectedDate;
  }

  getCurrentDateTime(): Date {
    return moment().toDate();
  }


  createDateFromString(date: string): Date {
    return moment(date).toDate();
  }
  // 현재의 시간을 가져온다, date는 옵셔널
  // 'L'은 03/02/2020으로 표시
  //
  getDateTimeISO(date?: Date): string {
    return date ? moment(date).format('L') : moment().format('L');
  }

  get installDate(): Date {
    return this._installDate;
  }
  set installDate(value: Date) {
    this._installDate = value;
  }  

  getDateTimeISOWithFormat(date?: Date): string {
    return date ? moment(date).format('L') : moment().format('L');
  }
}
