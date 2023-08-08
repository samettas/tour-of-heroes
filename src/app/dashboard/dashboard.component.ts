import { Component,OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit { 
  heroes: Hero[]=[];
  constructor(private fs:HeroService){}

  ngOnInit(): void {
    this.getHeroes(); 
  }
  
  getHeroes():void{
    
    this.fs.getHeroes()

    .subscribe((heroes:any[])=>{this.heroes=heroes;
      
    console.log(heroes)
    });
  }
  
}
