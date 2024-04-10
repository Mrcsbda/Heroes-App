import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Hero, Publisher} from "../../interfaces/hero.interface";
import {HeroesService} from "../../services/heroes.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-add-new-hero-page',
  templateUrl: './add-new-hero-page.component.html',
  styleUrl: './add-new-hero-page.component.scss'
})
export class AddNewHeroPageComponent implements OnInit {
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

  constructor(
    private heroesService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackbar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    if (!this.router.url.includes('edit')) return
    const heroId = this.activatedRoute.snapshot.params['id']
    this.heroesService.getHeroById(heroId).subscribe(hero => {
      if (!hero) return this.router.navigateByUrl('/')
      this.heroForm.reset(hero)
      return
    })
  }

  get currentHero(): Hero {
    return this.heroForm.value as Hero
  }

  onSubmit() {
    if (!this.heroForm.valid) return
    if (this.currentHero.id) {
      this.heroesService.updateHero(this.currentHero).subscribe(hero => {
        this.showSnackbar(`${hero.superhero} updated!`)
      })
      return
    }

    this.heroesService.addHero(this.currentHero).subscribe(hero => {
      this.router.navigate(['/heroes/edit', hero.id])
      this.showSnackbar(`${hero.superhero} created!`)

    })
  }

  showSnackbar(message: string) {
    this.snackbar.open(message, 'Done', {duration: 2500})
  }
}
