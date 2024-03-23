import {Component} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Publisher} from "../../interfaces/hero.interface";

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

  onSubmit() {
    console.log({
      formIsValid: this.heroForm.valid,
      value: this.heroForm.value
    })
  }
}
