import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpRequest,
  HttpEventType,
  HttpResponse,
  HttpBackend,
  HttpHeaders
} from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class UploadService {
  private readonly API= `${environment.API}`;

  constructor(private httpBackend: HttpBackend) { }

  public upload(files: Set<File>,url:String, mes?: string): { [key: string]: { progress: Observable<number> } } {
    const http = new HttpClient(this.httpBackend);


    console.log('mes',mes);

    // this will be the our resulting map
    const status: { [key: string]: { progress: Observable<number> } } = {};

    files.forEach(file => {
      // create a new multipart-form for every file
      const formData: FormData = new FormData();
      formData.append('file', file, file.name);
      formData.append('mes', mes);

 

      
      const headers = new HttpHeaders(
        {
        'Authorization': "Bearer "+localStorage.getItem('token'),
      });
      

      // create a http-post request and pass the form
      // tell it to report the upload progress
      const req = new HttpRequest('POST', this.API+url, formData, {
        reportProgress: true,
        headers:headers
      },);

       console.log(JSON.stringify(req));
      // create a new progress-subject for every file
      const progress = new Subject<number>();

      // send the http-request and subscribe for progress-updates

      const startTime = new Date().getTime();
      http.request(req).subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          // calculate the progress percentage

          const percentDone = Math.round((100 * event.loaded) / event.total);
          // pass the percentage into the progress-stream
          progress.next(percentDone);
        } else if (event instanceof HttpResponse) {
          // Close the progress-stream if we get an answer form the API
          // The upload is complete
          progress.complete();
        }
      });

      // Save every progress-observable in a map of all observables
      status[file.name] = {
        progress: progress.asObservable()
      };
    });

    // return the map of progress.observables
    return status;
  }
}
