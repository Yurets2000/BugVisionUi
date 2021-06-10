import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {ImagePickerConf} from 'ngp-image-picker';
import {ClassificationResponse} from '../../models/ClassificationResponse';
import {ClassificationService} from '../../services/classification.service';
import {TokenStorageService} from '../../services/token-storage.service';
import {TempDatasetInfo} from '../../models/TempDatasetInfo';

@Component({
  selector: 'app-load-sample',
  templateUrl: './load-sample.component.html',
  styleUrls: ['./load-sample.component.css']
})
export class LoadSampleComponent implements OnInit {

  imagePickerConf: ImagePickerConf;

  imagePickerSrc: string;

  @ViewChild('picker') imagePicker;

  image: string;
  selectedClass: string;
  classes: string[];
  result: ClassificationResponse;
  tempDatasetInfo: TempDatasetInfo;

  constructor(private classificationService: ClassificationService,
              private tokenStorageService: TokenStorageService) {
  }

  ngOnInit(): void {
    this.updateImagePickerConf(window.innerWidth);
    this.classificationService.getClasses().subscribe(
      data => {
        this.classes = data.classes;
      });
    this.classificationService.getTempDatasetInfo().subscribe(
      data => {
        this.tempDatasetInfo = data;
      });
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

  public uploadImage(): void {
    const uploadRequest = {
      image: this.image,
      className: this.selectedClass
    };
    this.classificationService.uploadImage(uploadRequest).subscribe(
      data => {
        this.image = null;
        this.selectedClass = null;
        this.imagePicker.onRemove();
        this.classificationService.getTempDatasetInfo().subscribe(
          data2 => {
            this.tempDatasetInfo = data2;
          });
      }
    );
  }

  public loadImage(): void {
    const toDataURL = url => fetch(url)
      .then(response => response.blob())
      .then(blob => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      }));
    this.classificationService.loadImage(this.selectedClass).subscribe(
      data => {
        const dataImage = data.image;
        console.log(dataImage);
        if (dataImage) {
          this.imagePickerSrc = dataImage;
          toDataURL(dataImage).then(
            image64 => {
              this.image = image64.toString();
            }
          );
        }
      }
    );
  }
}
