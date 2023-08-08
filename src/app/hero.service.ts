import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Firestore, collection, collectionData ,setDoc,doc,deleteDoc,updateDoc, collectionSnapshots, query, where} from '@angular/fire/firestore';
import { Hero } from './hero';
import { MessageService } from './message.service';


@Injectable({ providedIn: 'root' })
export class HeroService {

  private heroesUrl = 'api/heroes';  

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private fs:Firestore=inject(Firestore),
    private messageService: MessageService) { }


  getHeroes(){
    return collectionData(collection(this.fs,'heroes'));
  }
  
  getHeroNo404<Data>(id: number) {
    const url = `${this.heroesUrl}/?id=${id}`;
    return this.http.get<Hero[]>(url)
      .pipe(
        map(heroes => heroes[0]), 
        tap(h => {
          const outcome = h ? 'fetched' : 'did not find';
          this.log(`${outcome} hero id=${id}`);
        }),
        catchError(this.handleError<Hero>(`getHero id=${id}`))
      );
  }

  getHero(id: number) {
    const url = `${this.heroesUrl}/${id}`;
    
    return collectionSnapshots(query(collection(this.fs,'heroes'),where('id','==',id)))

    /*return this.fs.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );*/
  }

  searchHeroes(name: string) {

    return collectionSnapshots(query(collection(this.fs,'heroes'),where('name','==',name)))
  }



  
  addHero(hero: Hero) {
    
    const heroData = { ...hero }; // Hero nesnesini bir kopya olarak alıyoruz
    
    return setDoc(doc(this.fs, 'heroes/' + hero.id), heroData);
  
    }

  deleteHero(hero:Hero){
      return deleteDoc(doc(this.fs,'heroes/'+hero.id))

    }
  updateHero(hero:Hero){

      return updateDoc(doc(this.fs,'heroes/'+hero.id),{...hero})
    }

  /**
   
  
   * @param operation 
   * @param result 
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

   
      console.error(error); 

     
      this.log(`${operation} failed: ${error.message}`);

      
      return of(result as T);
    };
  }

  
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
}