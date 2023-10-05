import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { configuration } from '@app/configuration';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudysetService {

  constructor(private http: HttpClient) {
  }

  public getUserStudysets(): Observable<any> {
    return this.http.get(
      configuration.API_URL + 'studysets/getmany'
    );
  }

  public getUserCards(id: string): Observable<any> {
    return this.http.get(
      configuration.API_URL + `studysets/getcards/${id}`
    );
  }

  public getUserCardById(studysetId: string, cardId: string): Observable<any> {
    return this.http.get(
      configuration.API_URL + `studysets/getcard/${studysetId}/card/${cardId}`
    );
  }

  public addStudyset(title: string, description: string): Observable<any> {
    return this.http.post(
      configuration.API_URL + 'studysets/add',
      {
        title: title,
        description: description
      },
    );
  }

  public addCardToStudyset(studysetId: string, term: string, definition: string): Observable<any> {
    return this.http.post(
      configuration.API_URL + 'studysets/addcard',
      {
        studysetId: studysetId,
        term: term,
        definition: definition
      }
    );
  }

  public editCard(studysetId: string, cardId: string, term: string, definition: string): Observable<any> {
    return this.http.put(
      configuration.API_URL + 'studysets/editcard',
      {
        studysetId: studysetId,
        cardId: cardId,
        term: term,
        definition: definition
      }
    );
  }

  public editStudyset(studysetId: string, title: string, description: string): Observable<any> {
    return this.http.put(
      configuration.API_URL + 'studysets/edit',
      {
        studysetId: studysetId,
        title: title,
        description: description
      }
    );
  }

  public deleteCard(studysetId: string): Observable<any> {
    return this.http.delete(
      configuration.API_URL + 'studysets/delete',
      {
        body: {
          studysetId: studysetId,
        }
      },
    );
  }

  public deleteCardFromStudyset(studysetId: string, cardId: string): Observable<any> {
    return this.http.delete(
      configuration.API_URL + 'studysets/deletecard',
      {
        body: {
          studysetId: studysetId,
          cardId: cardId
        }
      },
    );
  }
}
