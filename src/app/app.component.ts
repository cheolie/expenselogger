import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { DataService } from './services/data/data.service';
import { StorageService } from './services/storage/storage.service';
import { StorageKeys } from './constants/constants';
import { DatetimeService } from './services/datetime/datetime.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private dataService: DataService,
    private storageService: StorageService,
    private dateTimeService: DatetimeService

  ) {
    this.initializeApp().then(() => {
      this.initializeInstallDate();
    });    
  }

  async initializeApp(): Promise<void> {
    return this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  initializeInstallDate(): void {
    this.storageService.getFromLocalStorage(StorageKeys.INSTALL_DATE).then((val) => {
      if(val) {
        this.dateTimeService.installDate = val;

      }
      else {
        this.storageService.saveToLocalStorage(StorageKeys.INSTALL_DATE, this.dateTimeService.getCurrentDateTime())
      }      
    });
  }
}
