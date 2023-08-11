import { Observable } from 'rxjs';
import { environment } from './../../../../environments/environments';
import { AuthService } from 'src/app/services/auth/auth.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  // API url
  private baseApiUrl = environment.apiUrl + "/recadastramento/servidor/upload/"

  private headers : any

  constructor
  (
    private http: HttpClient,
    private authService: AuthService
  )
  {}

  // Returns an observable
  upload(arrayfiles: any[], matricula: any):Observable<any> {

    this.getToken()

      // Create form data
      const formData = new FormData();

      // Store form name as "file" with file data

      arrayfiles.forEach(file => {
        if(file != undefined){
          formData.append("arquivos", file, file.name)
        }
      })

      // Make http post request over api
      // with formData as req
      return this.http.post(this.baseApiUrl + matricula, formData, {headers: this.headers})
  }

  private getToken() {

    let token = this.authService.getToken();

    this.headers = new HttpHeaders()
      .set('SecureToken', token);
  }

}
