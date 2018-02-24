import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {TranslateService} from "@ngx-translate/core";

/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {


  language: string='en';


  constructor(public navCtrl: NavController,
              public translate: TranslateService,
              public navParams: NavParams) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

  saveSettings() {

    // this.translate.use(this.language);
    this.translate.setDefaultLang(this.language);


  }
}
