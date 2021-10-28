import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, EMPTY, of, Observable } from 'rxjs';

import { catchError, first } from 'rxjs/operators';
import { Article } from '../app/Article';


@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  PHP_API_SERVER = "http://127.0.0.1:8000/api/articles";
  articles$: BehaviorSubject<Article[]>;
  articles: Array<Article> = [];
  private mock: boolean = false;

  constructor(
    private http: HttpClient
  ) {
    this.articles$ = new BehaviorSubject<Article[]>([]);
  }

  getAll() {
    if (this.mock) {
      this.articles = [{ "id": 1, "created_at": "2021-10-04T15:02:45.000000Z", "updated_at": "2021-10-04T15:02:45.000000Z" }];
      this.articles$.next(this.articles);
    }
    else {
      this.http.get<Article[]>(this.PHP_API_SERVER).pipe(
        first(),
        catchError(error => {
          console.log(error);
          return of([]);
        })
      ).subscribe((articles: any) => {
        this.articles = articles.data;
        console.log(this.articles);
        this.articles$.next(this.articles);
      });
    }
  }

  add(article: Article) {
    this.http.post<any>(`${this.PHP_API_SERVER}`, article).pipe(
      first(),
      catchError(error => {
        console.log(error);
        return EMPTY;
      })
    ).subscribe(res => {
      article.id = res.data.id;
      this.articles.push(article);
      this.articles$.next(this.articles);
    });
  }

  delete(id: number) {
    this.http.delete<any>(`${this.PHP_API_SERVER}/${id}`).pipe(
      first(),
      catchError(error => {
        console.log(error);
        return EMPTY;
      })
    ).subscribe(() => {
      this.articles = this.articles.filter(p => {
        return p.id != id
      });

      this.articles$.next(this.articles);
    });
  }

  edit(article: Article) {
    let findElem = this.articles.find(p => p.id == article.id);
    if (findElem) {

      findElem.updated_at = new Date().toString();
    }
    this.http.put<any>(`${this.PHP_API_SERVER}/${article.id}`, findElem).pipe(
      first(),
      catchError(error => {
        console.log(error);
        return EMPTY;
      })
    ).subscribe(() => {
      this.articles$.next(this.articles);
    });
  }

  remove(id: number) {
    this.http.delete<any>(`${this.PHP_API_SERVER}/${id}`).pipe(
      first(),
      catchError(error => {
        console.log(error);
        return EMPTY;
      })
    ).subscribe(() => {
      this.articles = this.articles.filter(p => {
        return p.id != id
      });

      this.articles$.next(this.articles);
    });
  }

}