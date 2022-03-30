import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

import { take, filter } from 'rxjs/operators';

import { CharacterService } from '@shared/services/character.service';
import { Character } from '@shared/interface/character.interface'

type RequestInfo={
  next:any;
}

@Component({
  selector: 'app-characters-list',
  templateUrl: './characters-list.component.html',
  styleUrls: ['./characters-list.component.scss']
})
export class CharactersListComponent implements OnInit{
  characters:Character[] = [];
  info:RequestInfo={
    next:null,
  };
  private pageNum = 1;
  private query: string = "";
  private hideScrollHeight = 200;
  private showScrollHeight = 500;
  
  constructor(
    private characterSvc:CharacterService, 
    private route:ActivatedRoute,
    private router:Router) { 
      this.onUrlChange();
  }

  ngOnInit(): void {
      this.getCharactersByQuery();
  }

  private onUrlChange():void{
    this.router.events
    .pipe(filter((event) => event instanceof NavigationEnd))
    .subscribe(() => {
      this.characters = [];
      this.pageNum = 1;
      this.getCharactersByQuery();
    });
  }

  private getCharactersByQuery():void{
    this.route.queryParams.pipe(take(1)).subscribe((params) => {
      console.log('Params ->',params)
      this.query = params['q'];
      this.getDataFromService();
    })
  }

  private getDataFromService():void{
    this.characterSvc
      .searchCharacters(this.query, this.pageNum)
      .pipe(take(1))
      .subscribe((res:any) => {
        if(res?.results?.length){
          const {info, results} = res;
        this.characters = [ ...this.characters, ...results];
        this.info = info;
        }else{
          this.characters = [];
        }
      });
  }
}
