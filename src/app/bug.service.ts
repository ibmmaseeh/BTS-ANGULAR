import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Bug } from './Bug';
import { STATUS } from './STATUS';

@Injectable({
  providedIn: 'root'
})
export class BugService {

  constructor(private http: HttpClient) { }
  saveBug(bug: Bug) {
    return this.http.post('http://localhost:8080/bug', bug, {
      headers: { "content-type": 'application/json' },responseType:'text'


    });
  }

  getBugs() {
    const httpHeaders = new HttpHeaders();
    const endpointURL = 'http://localhost:8080/bug/'
    httpHeaders.append('content-type', 'application/json');
    return this.http.get(endpointURL, { headers: httpHeaders });
  }

  // getBug() {
  //   let endpointURL = 'http://localhost:8080/bug/title/';

  //   const httpHeaders = new HttpHeaders();
  //   httpHeaders.append('content-type', 'application/json');
  //   return this.http.get('http://localhost:8080/bug/title/' + bugtitle, { headers: httpHeaders });

  // }

  updateBug(bugId, updatedBody) {
    const endpointURL = 'http://localhost:8080/bug/' + bugId;
    return this.http.put(endpointURL, updatedBody);
  }
  getBugbyStatusAndTitle(status:string,title:string){
    const endpointURL = 'http://localhost:8080/bug/search/'
    const httpHeaders = new HttpHeaders();
    httpHeaders.append('content-type', 'application/json');
    return this.http.get(endpointURL+ title +'/'+ status, { headers: httpHeaders });
  }

  getBugByName(title: string) {
    const endpointURL = 'http://localhost:8080/bug/'
    return this.http.get(endpointURL + title);
  }
  getBugByStatus(status: string) {
    const endpointURL = 'http://localhost:8080/bug/'
    return this.http.get(endpointURL + 'status/' + status);
  }


  deleteBug(bugId){
    const endpointURL = 'http://localhost:8080/bug/' + bugId;
    return this.http.delete(endpointURL);
  }

  // readBug(bugTitle){
  //   const httpHeaders = new HttpHeaders();
  //   httpHeaders.append('content-type', 'application/json');
  //   return this.http.get('http://localhost:8080/bug/title'+ bugTitle, { headers: httpHeaders });

  // }






}
