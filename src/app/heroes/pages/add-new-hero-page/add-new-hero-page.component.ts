import {Component} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Hero, Publisher} from "../../interfaces/hero.interface";
import {HeroesService} from "../../services/heroes.service";

@Component({
  selector: 'app-add-new-hero-page',
  templateUrl: './add-new-hero-page.component.html',
  styleUrl: './add-new-hero-page.component.scss'
})
export class AddNewHeroPageComponent {
  public heroForm = new FormGroup({
    id: new FormControl<string>('', {nonNullable: true}),
    superhero: new FormControl<string>(''),
    publisher: new FormControl<Publisher>(Publisher.DCComics),
    alter_ego: new FormControl<string>(''),
    first_appearance: new FormControl<string>(''),
    characters: new FormControl<string>(''),
    alt_img: new FormControl<string>(''),
  });

  public publishers = [
    {id: 'DC Comics', desc: 'DC - Comics'},
    {id: 'Marvel Comics', desc: 'Marvel - Comics'}
  ];

  constructor(private heroesService: HeroesService) {
  }

  get currentHero(): Hero {
    return this.heroForm.value as Hero
  }

  onSubmit() {
    console.log('hola1')
    if (!this.heroForm.valid) return
    if(this.currentHero.id){
      this.heroesService.updateHero(this.currentHero).subscribe(hero => {
      })
      return
    }
    console.log('hola2')

    this.heroesService.addHero(this.currentHero).subscribe(hero => {
      console.log('guardado')
    })
  }
}
