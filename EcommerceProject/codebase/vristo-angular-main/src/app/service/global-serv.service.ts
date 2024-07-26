import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GlobalServService {
    public authHost  : string = 'http://102.23.120.135:8082/api/v1/login'
    public apiHost  : string = 'http://102.23.120.135:8082/api/v1'

    getToken(){
      return localStorage.getItem('token')
    }
}
