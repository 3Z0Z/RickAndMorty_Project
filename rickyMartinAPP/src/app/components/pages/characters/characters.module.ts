import { CharactersListComponent } from '@characters/characters-list/characters-list.component';
import { CharacterDetailsComponent } from '@characters/character-details/character-details.component';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

const myComponents = [CharacterDetailsComponent, CharactersListComponent];

@NgModule({
  declarations: [...myComponents],
  imports: [CommonModule, RouterModule],
  exports:[...myComponents],
})
export class CharactersModule { }
