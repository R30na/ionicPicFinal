import {Component, ViewChild} from '@angular/core';
import {Events, Nav, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {TranslateService} from "@ngx-translate/core";


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = 'HomePage';
  // language:boolean=false;

  pages: Array<{ title: string, component: any }>;

  constructor(public platform: Platform,
              public statusBar: StatusBar,
              public events: Events,
              translate: TranslateService,
              public splashScreen: SplashScreen) {
    this.initializeApp();
    translate.setDefaultLang('en');

    // used for an example of ngFor and navigation
    this.pages = [
      {title: 'خانه', component: 'HomePage'},
      {title: 'درباره برنامه', component: 'AboutPage'},
      {title: 'تنظیمات', component: 'SettingsPage'},
    ];

  }


  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();

    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    // if (page.title == 'خانه') {
    //   this.nav.setRoot(page.component);
    // } else {
    //   this.nav.push(page.component);
    // }

    if (page == 'HomePage') {
      this.nav.setRoot(page);
    } else {
      this.nav.push(page);
    }

  }


  menuClosed() {
    this.events.publish('menu:closed', '');
  }

  menuOpened() {
    this.events.publish('menu:opened', '');
  }


  // changeLanguage(){
  //
  //   if(this.language == true){
  //     this.translate.use('en');
  //   } else {
  //     this.translate.use('fa');
  //   }
  //
  // }

}
