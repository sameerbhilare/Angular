import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpEventType } from '@angular/common/http';
import { Post } from './post.model';
import { map, catchError, tap } from "rxjs/operators";
import { Subject, throwError } from 'rxjs';

@Injectable({providedIn: 'root'})
export class PostsService {

    error = new Subject<string>();
    constructor(private http: HttpClient) {
    }

    createAndStorePost(title: string, content: string) {

        const postData: Post = {title: title, content: content};

        this.http
        .post<{ name: string }>(
            'https://ng-complete-guide-6197a.firebaseio.com/posts.json',
            postData,
            {
                observe: 'response'
            }
        )
        .subscribe(
            responseData => {
                console.log(responseData);
            },
            error => {
                this.error.next(error.message);
            }
        );
    }

    fetchPosts() {
        return this.http
        .get<{ [key: string]: Post}>(
            'https://ng-complete-guide-6197a.firebaseio.com/posts.json',
            {
                headers: new HttpHeaders({'custom-header': 'hellow'}),
                params: new HttpParams().set('print','pretty'),
                responseType: 'json'
            }
        )
        .pipe(
            map( responseData => {
                const postsArray: Post[] = [];
                for(const key in responseData) {
                postsArray.push({ ...responseData[key], id:key });
                }
                return postsArray;
            }),
            catchError( errorRes => {
                // send to analytics server
                return throwError(errorRes);
            })
        );
    }

    clearPosts() {
       return this.http
        .delete(
            'https://ng-complete-guide-6197a.firebaseio.com/posts.json',
            {
                observe: "events"
            }
        )
        .pipe(tap(event => {
            if(event.type == HttpEventType.Sent) {
                console.log('Request is sent');
            } 
            if(event.type == HttpEventType.Response) {
                console.log(event.body);
            }
        }));
    }
}