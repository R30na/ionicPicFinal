import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {HomePage} from './home';
import {AwsServiceProvider} from "../../providers/aws-service/aws-service";
import {CameraPreview} from "@ionic-native/camera-preview";
import {SpinnerDialog} from "@ionic-native/spinner-dialog";

@NgModule({
  declarations: [
    HomePage,
  ],
  imports: [
    IonicPageModule.forChild(HomePage),

  ],
  providers: [
    AwsServiceProvider,
    CameraPreview,
    SpinnerDialog,
  ]
})
export class HomePageModule {

}
