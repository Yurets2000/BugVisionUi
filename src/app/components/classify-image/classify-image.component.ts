import {Component, HostListener, OnInit} from '@angular/core';
import {ImagePickerConf} from 'ngp-image-picker';
import {ClassificationService} from '../../services/classification.service';
import {TokenStorageService} from '../../services/token-storage.service';
import {ClassificationRequest} from '../../models/ClassificationRequest';
import {ClassificationResponseEntry} from '../../models/ClassificationResponseEntry';
import {ClassificationStatistic} from '../../models/ClassificationStatistic';
import {ClassificationStatisticEntry} from '../../models/ClassificationStatisticEntry';
import {ClassificationResponse} from '../../models/ClassificationResponse';

@Component({
  selector: 'app-classify-image',
  templateUrl: './classify-image.component.html',
  styleUrls: ['./classify-image.component.css']
})
export class ClassifyImageComponent implements OnInit {

  imagePickerConf: ImagePickerConf;

  image: string;
  result: ClassificationResponseEntry[];

  constructor(private classificationService: ClassificationService,
              private tokenStorageService: TokenStorageService) {
  }

  ngOnInit(): void {
    this.updateImagePickerConf(window.innerWidth);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event): void {
    this.updateImagePickerConf(event.target.innerWidth);
  }

  private updateImagePickerConf(width: number): void {
    if (width > 767) {
      this.imagePickerConf = {
        borderRadius: '4px',
        language: 'en',
        width: '50vw',
        height: '50vw',
      };
    } else {
      this.imagePickerConf = {
        borderRadius: '4px',
        language: 'en',
        width: '100%',
        height: '90vw',
      };
    }
  }

  public onImageChange(e): void {
    if (!e) {
      this.image = null;
    } else {
      this.image = e.toString();
    }
  }

  public classifyImage(): void {
    const classificationRequest: ClassificationRequest = {
      userId: this.tokenStorageService.getUserDetails() ? this.tokenStorageService.getUserDetails().id : null,
      resultsNum: 5,
      image: this.image
    };
    this.classificationService.classify(classificationRequest).subscribe(
      data => {
        this.result = this.extractClassificationResponseEntries(data, 5);
      }
    );
  }

  private extractClassificationResponseEntries(classificationResponse: ClassificationResponse, max: number):
    ClassificationResponseEntry[] {
    const result = [];
    for (const [key, value] of Object.entries(classificationResponse)) {
      if (result.length < max) {
        result.push({
          entryKey: key,
          entryValue: value
        });
      }
    }
    result.sort((a, b) => b.entryValue - a.entryValue);
    return result;
  }

}
