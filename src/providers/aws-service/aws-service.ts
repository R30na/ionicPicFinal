import {Injectable} from '@angular/core';
import AWS from 'aws-sdk';

/*
  Generated class for the AwsServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AwsServiceProvider {

  private rekognition = new AWS.Rekognition({
    accessKeyId: 'AKIAJRZSGYE4N735V7AA',
    secretAccessKey: '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',
    region: 'us-east-1'
  });

  constructor() {
    console.log('Hello AwsServiceProvider Provider');
  }

  base64ToArrayBuffer(base64) {

    var binary_string = window.atob(base64);
    var len = binary_string.length;
    var bytes = new Uint8Array(len);
    for (var i = 0; i < len; i++) {
      bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;

  }

  detectLabels(imageData): Promise<any> {

    return new Promise(resolve => {

      let params = {
        Image: {
          Bytes: this.base64ToArrayBuffer(imageData)
        },
        MaxLabels: 20,
        MinConfidence: 70
      };
      this.rekognition.detectLabels(params, function (err, data) {
        if (err) {
          alert('Service Error: ' + err);
        }
        if (data) {
          resolve(data);
        }
      });
    });
  }

  detectFaces(imageData): Promise<any> {

    return new Promise(resolve => {

      let params = {
        Image: {
          Bytes: this.base64ToArrayBuffer(imageData)
        },
        Attributes: ['ALL']
      };
      this.rekognition.detectFaces(params, function (err, data) {
        if (err) {
          alert('Service Error: ' + err);
        }
        if (data) {
          resolve(data);
        }
      });

    });
  }

}
