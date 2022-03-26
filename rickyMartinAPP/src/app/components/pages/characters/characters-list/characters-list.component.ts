import { CharacterService } from './../../../../shared/services/character.service';
import { Character } from '@app/shared/interface/character.interface'
import { take } from 'rxjs/operators';
import { Component } from '@angular/core';

type RequestInfo={
  next:string;
}

@Component({
  selector: 'app-characters-list',
  templateUrl: './characters-list.component.html',
  styleUrls: ['./characters-list.component.scss']
})
export class CharactersListComponent{
  characters:Character[] = [];
  info:RequestInfo={
    next:"",
  };
  private pageNum = 1;
  private query: string = "";
  private hideScrollHeight = 200;
  private showScrollHeight = 500;
  
  constructor(private characterSvc:CharacterService) { 

  }

  private getDataFromService():void{
    this.characterSvc.searchCharacters(this.query, this.pageNum)
    .pipe(take(1))
    .subscribe((res:any) => {
      const {info, results} = res;
      this.characters = [ ... this.characters, ... results];
      this.info = info;
    });
  }

}
