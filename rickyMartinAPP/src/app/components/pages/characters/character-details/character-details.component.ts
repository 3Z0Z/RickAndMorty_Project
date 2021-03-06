import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { CharacterService } from '@app/shared/services/character.service';
import { Character } from '@app/shared/interface/character.interface';

@Component({
  selector: 'app-character-details',
  templateUrl: './character-details.component.html',
  styleUrls: ['./character-details.component.scss']
})
export class CharacterDetailsComponent implements OnInit {

  constructor(
    private route:ActivatedRoute,
    private characterSvc:CharacterService,
    private location:Location,
    public character$: Observable<Character>) { 

  }

  ngOnInit(): void {
    this.route.params
      .pipe(take(1))
      .subscribe((params) => {
        const id = params['id'];
        this.character$ = this.characterSvc.getDetails(id);
      })
  }

  onGoBack():void{
    this.location.back();
  }
}
