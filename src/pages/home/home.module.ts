import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {HomePage} from './home';
import {AwsServiceProvider} from "../../providers/aws-service/aws-service";
import {CameraPreview} from "@ionic-native/camera-preview";
import {SpinnerDialog} from "@ionic-native/spinner-dialog";
import {InAppBrowser} from "@ionic-native/in-app-browser";
import {TranslateModule} from "@ngx-translate/core";


@NgModule({
  declarations: [
    HomePage,
  ],
  imports: [
    IonicPageModule.forChild(HomePage),
    TranslateModule.forChild()

  ],
  providers: [
    AwsServiceProvider,
    CameraPreview,
    SpinnerDialog,
    InAppBrowser
  ]
})
export class HomePageModule {

}
