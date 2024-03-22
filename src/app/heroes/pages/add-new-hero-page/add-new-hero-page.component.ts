import {Component} from '@angular/core';

@Component({
  selector: 'app-add-new-hero-page',
  templateUrl: './add-new-hero-page.component.html',
  styleUrl: './add-new-hero-page.component.scss'
})
export class AddNewHeroPageComponent {
  public publishers = [{
    id: 'DC Comics',
    desc: 'DC - Comics'
  }, {
    id: 'Marvel Comics',
    desc: 'Marvel - Comics'
  }];
}
