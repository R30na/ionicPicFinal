import {Component} from '@angular/core';
import {Events, IonicPage, NavController, NavParams, Platform} from 'ionic-angular';
import {SpinnerDialog} from "@ionic-native/spinner-dialog";
import {AwsServiceProvider} from "../../providers/aws-service/aws-service";
import {CameraPreview, CameraPreviewOptions, CameraPreviewPictureOptions} from "@ionic-native/camera-preview";
import {InAppBrowser} from "@ionic-native/in-app-browser";

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {


  faceResults: any;
  imageURL: string;
  imageData: string;
  showTakePicture: boolean = true;
  labelResults: any;
  analyzeMode: string;
  testText: string = 'This is a test';
  param = {value: 'world'};
  celebResults: any;

  constructor(public navCtrl: NavController,
              public events: Events,
              private Aws: AwsServiceProvider,
              public platform: Platform,
              private spinnerDialog: SpinnerDialog,
              private cameraPreview: CameraPreview,
              private iab: InAppBrowser,
              public navParams: NavParams) {

    events.subscribe('menu:opened', () => {
      cameraPreview.hide();
    });

    events.subscribe('menu:closed', () => {
      if (this.showTakePicture) {
        cameraPreview.show();
      }
    });

  }

  ionViewWillEnter() {
    this.spinnerDialog.show();
    this.initializeCamera();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');


  }

  ionViewWillLeave() {
    this.cameraPreview.stopCamera();
  }

  initializeCamera() {
    this.platform.ready().then(() => {
      this.showCam();
    });
  }

  showCam() {

    const cameraPreviewOpts: CameraPreviewOptions = {
      x: window.screen.width / 16,
      y: window.screen.height / 4,
      width: window.screen.width / 1.14,
      height: window.screen.height / 2,
      camera: 'front',
      tapPhoto: false,
      previewDrag: false,
      toBack: false,
    };

    this.cameraPreview.startCamera(cameraPreviewOpts).then(
      (res) => {
        console.log(res);
      },
      (err) => {
        // alert('start '+err);
      });

    this.cameraPreview.show().then(
      (res) => {
        console.log(res);
      }, (err) => {
        // alert('show '+err);
      });

    this.showTakePicture = true;
    this.labelResults = null;
    this.faceResults = null;
    this.spinnerDialog.hide();

  }

  takePicture() {
    this.spinnerDialog.show();
    const pictureOpts: CameraPreviewPictureOptions = {
      quality: 75
    };
    this.cameraPreview.takePicture(pictureOpts).then((imageData) => {
      this.imageURL = 'data:image/jpeg;base64,' + imageData;
      this.imageData = imageData;
    }, (err) => {
      console.log(err);
      this.imageURL = 'assets/imgs/logo.png';
    });

    this.showTakePicture = false;
    this.cameraPreview.hide();
    this.spinnerDialog.hide();
  }

  rotateCam() {
    this.cameraPreview.switchCamera();
  }

  analyzePhoto(mode) {
    this.spinnerDialog.show();
    this.labelResults = null;
    this.faceResults = null;
    this.celebResults = null;
    if (!mode) {
      this.spinnerDialog.hide();
      alert('لطفا یکی از گزینه ها را انتخاب کنید...');
      return false;
    }
    switch (mode) {
      case 'label':
        this.Aws.detectLabels(this.imageData).then(res => {
          this.labelResults = res.Labels;

          this.spinnerDialog.hide();
        }, (err) => {
          alert('Component Error:' + err);
        });

        break;
      case 'face':
        this.Aws.detectFaces(this.imageData).then(res => {
          this.faceResults = res.FaceDetails;
          this.spinnerDialog.hide();
        }, (err) => {
          alert('Component Error:' + err);
        });
        break;
      case 'celeb':
        this.Aws.celebrityDetect(this.imageData).then(res => {
          this.celebResults = res.CelebrityFaces;
          this.spinnerDialog.hide();
        }, (err) => {
          alert('Component Error:' + err);
        });
        break;
    }

  }

  openLink(url: string) {
    this.iab.create('http://' + url);
  }
}
