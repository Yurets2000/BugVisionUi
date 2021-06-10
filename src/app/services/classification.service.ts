import {Injectable} from '@angular/core';
import {apiUrls} from '../../api-urls';
import {HttpClient} from '@angular/common/http';
import {ClassificationRequest} from '../models/ClassificationRequest';
import {ClassificationResponse} from '../models/ClassificationResponse';
import {Observable} from 'rxjs';
import {UploadRequest} from '../models/UploadRequest';
import {LoadResponse} from '../models/LoadResponse';
import {ClassificationStatistic} from '../models/ClassificationStatistic';
import {TokenStorageService} from './token-storage.service';
import {TempDatasetInfo} from '../models/TempDatasetInfo';
import {ClassesResponse} from '../models/ClassesResponse';

@Injectable({
  providedIn: 'root'
})
export class ClassificationService {

  private readonly BASE_URL = apiUrls.CLASSIFICATION_API_URL;

  constructor(private http: HttpClient,
              private tokenStorageService: TokenStorageService) {
  }

  public classify(classificationRequest: ClassificationRequest): Observable<ClassificationResponse> {
    const url = this.BASE_URL + '/classify';
    const headersVal = {
      Authorization: 'Bearer ' + this.tokenStorageService.getToken()
    };
    return this.http.post<ClassificationResponse>(url, classificationRequest, {headers: headersVal});
  }

  public uploadImage(uploadRequest: UploadRequest): Observable<any> {
    const url = this.BASE_URL + '/upload-image';
    const headersVal = {
      Authorization: 'Bearer ' + this.tokenStorageService.getToken()
    };
    return this.http.post<any>(url, uploadRequest, {headers: headersVal});
  }

  public loadImage(className: string): Observable<LoadResponse> {
    const url = this.BASE_URL + '/load-image/' + className;
    const headersVal = {
      Authorization: 'Bearer ' + this.tokenStorageService.getToken()
    };
    return this.http.get<LoadResponse>(url, {headers: headersVal});
  }

  public getClassificationStatistic(userIdVal: string, startDateVal?: number, endDateVal?: number): Observable<ClassificationStatistic> {
    const url = this.BASE_URL + '/classification-statistic';
    const paramsVal = {
      userId: userIdVal,
      startDate: startDateVal ? startDateVal.toString() : '',
      endDate: endDateVal ? endDateVal.toString() : ''
    };
    const headersVal = {
      Authorization: 'Bearer ' + this.tokenStorageService.getToken()
    };
    return this.http.get<ClassificationStatistic>(url, {params: paramsVal, headers: headersVal});
  }

  public getClasses(): Observable<ClassesResponse> {
    const url = this.BASE_URL + '/classes';
    const headersVal = {
      Authorization: 'Bearer ' + this.tokenStorageService.getToken()
    };
    return this.http.get<ClassesResponse>(url, {headers: headersVal});
  }

  public getTempDatasetInfo(): Observable<TempDatasetInfo> {
    const url = this.BASE_URL + '/temp-dataset-info';
    const headersVal = {
      Authorization: 'Bearer ' + this.tokenStorageService.getToken()
    };
    return this.http.get<TempDatasetInfo>(url, {headers: headersVal});
  }
}
