import { Component,Input } from '@angular/core';
import { Hero } from '../hero';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { HeroService } from '../hero.service';
@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent {
  
    @Input() hero?:Hero;

    constructor(
      private route:ActivatedRoute,
      private heroService:HeroService,
      private location:Location
    ){}
    
    ngOnInit(): void {
      this.getHero();
    }
    
    getHero(): void {
      const id = Number(this.route.snapshot.paramMap.get('id'));
      this.heroService.getHero(id)
        .subscribe((heroes) => {
          this.hero = heroes[0].data() as Hero;console.log(heroes)
        });
        
    }
    goBack(): void {
      this.location.back();
    }
    async save() {
      console.log(this.hero)
      if (this.hero) {
        await this.heroService.updateHero(this.hero)
          .then(() => this.goBack());
      }
    }
}
