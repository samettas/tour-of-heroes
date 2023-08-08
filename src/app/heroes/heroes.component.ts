import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: Hero[] = [];

  constructor(private heroService: HeroService) { }

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
    .subscribe((heroes:any) => this.heroes = heroes);
  }
  
  async deleteHeros(hero: Hero) {

    this.heroService.deleteHero(hero).then(res=>console.log('Silindi'))
    .catch(err=>console.log(err))
      
  }
  
  
  async add(name: string) {
    name = name.trim();
    if (!name) { return; }
  
    this.heroService.addHero({ name:name,id:Date.now() } as Hero)
      .then(hero => {
        //this.heroes.push({name,id:Date.now()}); // Kahramanı heroes listesine ekleyin
      })
      .catch(error => {
        console.error('Hata:', error); // Hata durumunda konsola hata mesajını yazdırın
      });
  }

  
  /*
  save(): void {
    this.heroService.addHero(this.heroes=heroes as Hero[])
  }
  
  */
}